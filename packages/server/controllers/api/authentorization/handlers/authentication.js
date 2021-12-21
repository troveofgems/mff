const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const ErrorResponse = require('../../../../middleware/Error').errorHandler;

const
  { asyncHandler } = require('../../../../middleware/Helpers/async-handler.middleware'),
  User = require('../../../../db/models/Users');

const
  _handleInvalidLoginAttempt = (req, res, next) => (ErrorResponse({
    statusCode: 400,
    overrideErrorFromServer: true,
    overrideFrom: 'login',
    overrideMessage: 'Invalid Credentials'
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

// @desc  Register User Account
// @route POST /api/vX/authentorization/authentication/register
// @access PUBLIC
const registerUser = asyncHandler(async (req, res, next) => {
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

// @desc  Log User Into Account
// @route POST /api/vX/authentorization/authentication/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res, next) => {
  let
    apiResponse = buildAPIBodyResponse('/authenticate/loginUser'),
    loginData = req.body,
    user = await User // Search & Return User Data
      .findOne({ email: loginData.email })
      .select('+password');

  if (!user) { return _handleInvalidLoginAttempt(req, res, next); }

  const userSuccessfullyVerified = await user.verifyCredentials(req.body.password);
  if(!userSuccessfullyVerified) { return _handleInvalidLoginAttempt(req, res, next); }

  apiResponse.success = true;

  // Create JWT For User
  apiResponse.userPog = user.getSignedJwt();
  console.log(user);
  apiResponse.data = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userRole: user.isAppAdmin ? "appAdmin" : "base",
    token: apiResponse.userPog
  };

  console.log('To Send Response: ', apiResponse);
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
    apiResponse = buildAPIBodyResponse('/authenticate/authenticatedProfile'),
    user = await User // Search & Return User Data
      .findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || req.user.firstName;
    user.lastName = req.body.lastName || req.user.lastName;
    user.email = req.body.email || req.user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
  }

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
  updateUserProfile
};