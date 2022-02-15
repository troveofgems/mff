const
  {
    authentication: {
      serveSanityCheck: serveAuthenticationCheck, registerUser, loginUser, getAuthenticatedProfile,
      ubyRegistrationTracking, requestToResetPassword, resetPasswordWithToken,
      updateUserProfile
    }
  } = require('../../../controllers/api/authentorization').authentorizationController,
  express = require('express'),
  { validate } = require('express-validation'),
  router = express.Router(),
  {
    protect
  } = require('../../../middleware/Helpers/route-authentication.middleware'),
  {
    registerUserValidation, loginUserValidation
  } = require('../../../validation/authentication.validation');

/************ Authentication Routes ****************/
router
  .route('/authentication')
  .get(serveAuthenticationCheck)

router
  .route('/authentication/forgotpwd')
  .post(requestToResetPassword);

router
  .route('/authentication/resetpwd/:resetToken')
  .put(resetPasswordWithToken);

router
  .route('/authentication/login')
  .post(validate(loginUserValidation), loginUser);

router
  .route('/authentication/register')
  .post(validate(registerUserValidation), registerUser);

router
  .route('/authentication/register/anonAnalytics/uby')
  .put(ubyRegistrationTracking);

router
  .route('/authentication/updateUser')
  .put(protect, updateUserProfile);

router
  .route('/authentication/authenticatedProfile')
  .get(protect, getAuthenticatedProfile);

module.exports = router;