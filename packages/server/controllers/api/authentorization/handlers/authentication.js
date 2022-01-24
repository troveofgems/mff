const { buildAPIBodyResponse } = require("../../../../utils/dev/controller.utils");
const ErrorResponse = require('../../../../middleware/Error').errorHandler;

const
  { asyncHandler } = require('../../../../middleware/Helpers/async-handler.middleware'),
  User = require('../../../../db/models/Users'),
  Analytics = require('../../../../db/models/Analytics');

const
  _handleInvalidLoginAttempt = (req, res, next, optMsg = undefined) => (ErrorResponse({
    statusCode: 400,
    overrideErrorFromServer: true,
    overrideFrom: 'login',
    overrideMessage: optMsg || 'Invalid Credentials'
  }, req, res, next));

// @desc  Serve Route Sanity Check
// @route GET /api/vX/authentorization/authentication
// @access PUBLIC
const serveSanityCheck = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/authenticate');
  return res
    .status(200)
    .json(response);
});


const _verifyOldPassword = async (email, oldPassword) => {
  let user = await User // Search & Return User Data
    .findOne({ currentEmail: email })
    .select('+password');

  return user.verifyCredentials(oldPassword);
};

// @desc  Register User Account
// @route POST /api/vX/authentorization/authentication/register
// @access PUBLIC
const registerUser = asyncHandler(async (req, res, next) => {
  console.log('To Register: ', req.body);
  let
    apiResponse = buildAPIBodyResponse('/authenticate/registerUser'),
    registrationData = req.body,
    user = await User.create(registrationData); // Create The User

  apiResponse.success = true;
  apiResponse.data = user;

  // Create JWT For User
  apiResponse.userPog = user.getSignedJwt();

  return res
    .status(201)
    .json(apiResponse);
});

// @desc  Registration Birth Year Anonymous Analytics
// @route POST /api/vX/authentorization/authentication/register/anonAnalytics/uby
// @access PUBLIC
const ubyRegistrationTracking = asyncHandler(async (req, res, next) => {
  let
    apiResponse = buildAPIBodyResponse('/authenticate/register/anonAnalytics/uby'),
    registrationData = req.body,
    analyticsDB = await Analytics.find(); // Fetch Analytics

  if (analyticsDB.length === 0) { // This will only ever run once.
    await Analytics.create({abyas: [registrationData]});

    await analyticsDB[0].save();
  } else {
    const records = analyticsDB[0].abyas;
    const filteredRecord = records.filter((record) => Object.keys(record)[0] === Object.keys(registrationData)[0]);

     if (filteredRecord.length === 0) {
      analyticsDB[0].abyas.push(registrationData);
      analyticsDB[0].save();
    } else { // Increment The Count
      let keyName = Object.keys(filteredRecord[0])[0];
      filteredRecord[0][keyName] = filteredRecord[0][keyName] += 1;
      let newData = [];
      newData = [...analyticsDB[0].abyas];
      await Analytics.updateOne({_id: analyticsDB[0]._id}, { abyas: newData }, {upsert: true});
    }
  }

  apiResponse.success = true;
  apiResponse.data = analyticsDB[0].abyas;

  return res
    .status(204)
    .json(apiResponse);
});

// @desc  Log User Into Account
// @route POST /api/vX/authentorization/authentication/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res, next) => {
  let
    apiResponse = buildAPIBodyResponse('/authenticate/loginUser'),
    loginData = req.body,
    user = await User // Search & Return User Data
      .findOne({ currentEmail: loginData.currentEmail })
      .select('+password');

  if (!user) { return _handleInvalidLoginAttempt(req, res, next); }
  // TODO: Check for Banned Status Foremost
  if (user.isBanned) { return _handleInvalidLoginAttempt(req, res, next, 'Your Account Has Been Banned. To Appeal This...'); }

  const userSuccessfullyVerified = await user.verifyCredentials(req.body.password);
  if(!userSuccessfullyVerified) {
    // TODO: Build Account Lockout Here
    if (user.loginAttempts === 3 || user.accountLockout) {
      let optMsg = 'Your Account Has Been Locked. Please Contact Support For Assistance.';
      return _handleInvalidLoginAttempt(req, res, next, optMsg);
    } else {
      if (user.loginAttempts < 3) {
        user.loginAttempts = user.loginAttempts += 1;
        user.loginAttempts === 3 ? user.accountLockout = true : false;
        user.save();
      }
      let
        attemptCountsLeft = 3 - user.loginAttempts,
        optMsg = `Invalid Credentials. ${attemptCountsLeft} ${attemptCountsLeft === 1 ? 'Try' : 'Tries'} Left.`;
      return _handleInvalidLoginAttempt(req, res, next, optMsg);
    }
  }

  apiResponse.success = true;

  // Create JWT For User
  apiResponse.userPog = user.getSignedJwt();
  apiResponse.data = {
    firstName: user.firstName,
    lastName: user.lastName,
    currentEmail: user.currentEmail,
    userRole: user.isAppAdmin ? "appAdmin" : "base",
    token: apiResponse.userPog
  };

  return res
    .status(200)
    .json(apiResponse);
});

// @desc  Fetch Logged In User's Profile
// @route GET /api/vX/authentorization/authentication/authenticatedProfile
// @access PRIVATE
const getAuthenticatedProfile = asyncHandler(async (req, res, next) => {
  let
    apiResponse = buildAPIBodyResponse('/authenticate/authenticatedProfile'),
    user = await User // Search & Return User Data
      .findById(req.user._id)
      .select('-password -isAppAdmin');

  apiResponse.success = true;

  apiResponse.data = {...user._doc};

  return res
    .status(200)
    .json(apiResponse);
});

// @desc  Allow User To Update Their Own Profile - first/last/email/password
// @route GET /api/vX/authentorization/authentication/updateUser
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res, next) => {
  let
    apiResponse = buildAPIBodyResponse('/authentication/updateUser'),
    user = await User // Search & Return User Data
      .findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.birthMonth = req.body.birthMonth || user.birthMonth;
    user.rememberMyAddress = req.body.rememberMyAddress || user.rememberMyAddress;

    if (req.body.update_email) {
      user.awaitingEmailVerification = req.body.awaitingEmailVerification;
      user.placeholderEmail = req.body.placeholderEmail;
    }

    if (req.body.update_password) {
      const oldPasswordVerified = await _verifyOldPassword(user.currentEmail, req.body.old_password);
      if (oldPasswordVerified && req.body.password !== "") {
        user.password = req.body.password;
        user.pwdType = req.body.pwdType;
      } else {
        // TODO: Need to throw failed password check and disallow the update to proceed.
      }
    }
  }

  user.authTokenType = req.body.authTokenType || user.authTokenType;

  const updatedUser = await user.save();

  apiResponse.success = true;
  apiResponse.data = {...updatedUser._doc};

  return res
    .status(200)
    .json(apiResponse);
});

module.exports.authenticationController = {
  getAuthenticatedProfile,
  loginUser,
  registerUser,
  serveSanityCheck,
  ubyRegistrationTracking,
  updateUserProfile
};