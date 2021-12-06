const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const ErrorResponse = require('../../../../middleware/Error');

const
  { asyncHandler } = require('../../../../middleware/Helpers/async-handler.middleware'),
  User = require('../../../../db/models/Users');

const
  _handleInvalidCredentials = (req, res, next) => {
    return ErrorResponse({
      message: 'Invalid Credentials',
      statusCode: 401
    }, req, res, next);
  };

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

  if (!user) { return _handleInvalidCredentials(req, res, next); }

  const userSuccessfullyVerified = await user.verifyCredentials(req.body.password);
  if(!userSuccessfullyVerified) { return _handleInvalidCredentials(req, res, next); }

  apiResponse.success = true;
  apiResponse.data = user;

  // Create JWT For User
  apiResponse.userPog = user.getSignedJwt();

  return res
    .status(200)
    .json(apiResponse);
});

module.exports.authenticationController = {
  loginUser,
  registerUser,
  serveSanityCheck
};