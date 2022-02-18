const { buildAPIBodyResponse } = require("../../../../utils/dev/controller.utils");
const ErrorResponse = require('../../../../middleware/Error').errorHandler;
const { sendEmail } = require('../../../../lib/email/sendEmail.routine');
const crypto = require('crypto');

const
  { asyncHandler } = require('../../../../middleware/Helpers/async-handler.middleware'),
  User = require('../../../../db/models/Users'),
  Analytics = require('../../../../db/models/Analytics');
const Product = require("../../../../db/models/Product");

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
  let
    apiResponse = buildAPIBodyResponse('/authenticate/registerUser'),
    registrationData = req.body,
    user = await User.create(registrationData); // Create The User

  // Send Verification Email
  sendEmail("register", registrationData).then(() => {});

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
  if (user.isBanned) { return _handleInvalidLoginAttempt(req, res, next, 'Your Account Has Been Banned. To Appeal This...'); }

  const userSuccessfullyVerified = await user.verifyCredentials(req.body.password);
  if(!userSuccessfullyVerified) {
    if (user.loginAttempts === 3 || user.accountLockout) {
      if (!user.accountLockout) {
        await User.findByIdAndUpdate({_id: user._id}, {
          accountLockout: true
        }, {upsert: true});
        // Send Verification Email
        sendEmail("lockout", user).then(() => {});
      }

      let optMsg = 'Your Account Has Been Locked. Please Contact Support For Assistance.';
      return _handleInvalidLoginAttempt(req, res, next, optMsg);
    } else {
      if (user.loginAttempts <= 3) {
        await User.findByIdAndUpdate({_id: user._id}, {
          loginAttempts: (user.loginAttempts + 1)
        }, {upsert: true});
      }
      let
        attemptCountsLeft = 3 - user.loginAttempts,
        optMsg = `Invalid Credentials. ${attemptCountsLeft} ${attemptCountsLeft === 1 ? 'Try' : 'Tries'} Left.`;
      return _handleInvalidLoginAttempt(req, res, next, optMsg);
    }
  } else {
    await User.findByIdAndUpdate({_id: user._id}, {
      loginAttempts: 0,
      lastLoggedIn: Date.now()
    }, {upsert: true});
  }

  apiResponse.success = true;

  // Create JWT For User
  apiResponse.userPog = user.getSignedJwt();
  apiResponse.data = {
    firstName: user.firstName,
    lastName: user.lastName,
    currentEmail: user.currentEmail,
    authLevel: user.authLevel,
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

  // Send Notification Email
  sendEmail("accountUpdate", updatedUser).then(() => {});

  return res
    .status(200)
    .json(apiResponse);
});

// @desc    Forgot Password
// @route   POST /api/vX/authentorization/authentication/forgotpwd
// @access  PUBLIC
const requestToResetPassword = asyncHandler(async (req, res, next) => {
  let
    apiResponse = buildAPIBodyResponse('/authentication/forgotPassword');

  const user = await User.findOne({currentEmail: req.body.login_email});

  if (!user) {
    console.log('No User Was Found...');
  }

  // Get Reset Token
  const resetToken = await user.getResetPasswordToken();

  await user.save({validateBeforeSave: false});

  let dtp = {
    firstName: user.firstName,
    resetUrl: `${req.protocol}://${req.get('host')}/api/v1/authentorization/authentication/resetpwd/${resetToken}`,
    feresetUrl: `http://localhost:3000/resetPassword/${resetToken}`,
    currentEmail: user.currentEmail
  };

  sendEmail("passwordReset", dtp).then(() => {});

  apiResponse.success = true;
  apiResponse.user = user;
  apiResponse.data = resetToken;

  return res
    .status(200)
    .json(apiResponse);
});

// @desc    Reset Password
// @route   PUT /api/vX/authentorization/authentication/resetpwd/:token
// @access  PUBLIC
const resetPasswordWithToken = asyncHandler(async (req, res, next) => {
  let
    apiResponse = buildAPIBodyResponse('/authentication/resetpwd/:token');

  console.log('Inside resetPasswordWithToken', req.params);

  // Get Hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    console.log('User Not Found By Token/Expire Combo');
    return next();
  }

  // Set New Password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  apiResponse.success = true;
  apiResponse.data = user;

  return res
    .status(200)
    .json(apiResponse);
});

// @desc  Allow Authenticated MFF User To Leave Product Review (If They Purchased The Product)
// @route PUT /api/vX/products/:pid/leaveReview
// @access PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/products/:id/leaveReview');

  let
    productToReview = await Product.findById(req.params.id),
    reviewToAdd = req.body;
  if (productToReview) {
    const alreadyReviewed = productToReview.reviews.find(review => review.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      console.log('Inside Already Reviewed change details of the particular review', req.user._id.toString());
      let
        unrelatedReviews = productToReview.reviews.filter(review => review.user.toString() !== req.user._id.toString()),
        reviewInQuestion = productToReview.reviews.filter(review => review.user.toString() === req.user._id.toString());

      console.log('Unrelated reviews: ', unrelatedReviews);
      console.log('Have The particular review: ', reviewInQuestion);

      reviewInQuestion[0].comment = reviewToAdd.comment;
      reviewInQuestion[0].rating = reviewToAdd.rating;

      productToReview.reviews = [...unrelatedReviews, reviewInQuestion[0]];
      productToReview.rating = productToReview.reviews.reduce((acc, item) => item.rating + acc, 0) / (productToReview.reviews.length === 0 ? 1 : productToReview.reviews.length);

      console.log("Prior To Saving: ", productToReview.reviews, reviewInQuestion);

      await productToReview.save();

      response.data = productToReview;
      response.success = true;

      return res
        .status(201)
        .json(response);
    }

    reviewToAdd.user = req.user._id;
    reviewToAdd.firstName = req.user.firstName;

    console.log('About To Add: ', reviewToAdd);

    productToReview.reviews.push(reviewToAdd);
    productToReview.reviewCount = productToReview.reviews.length;
    productToReview.rating = productToReview.reviews.reduce((acc, item) => item.rating + acc, 0) / (productToReview.reviews.length === 0 ? 1 : productToReview.reviews.length);

    await productToReview.save();

    response.data = productToReview;
    response.success = true;

    return res
      .status(201)
      .json(response);
  }
});

module.exports.authenticationController = {
  getAuthenticatedProfile,
  createProductReview,
  loginUser,
  registerUser,
  requestToResetPassword,
  resetPasswordWithToken,
  serveSanityCheck,
  ubyRegistrationTracking,
  updateUserProfile
};