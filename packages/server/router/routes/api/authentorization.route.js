const
  {
    authentication: {
      serveSanityCheck: serveAuthenticationCheck, registerUser, loginUser, getAuthenticatedProfile,
      updateUserProfile
    },
    authorization: {
      serveSanityCheck: serveAuthorizationCheck
    }
  } = require('../../../controllers/api/authentorization').authentorizationController,
  express = require('express'),
  { validate } = require('express-validation'),
  router = express.Router(),
  {
    setUserRoleMiddleware
  } = require('../../../middleware/Helpers/setUserRole.middleware'),
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
  .route('/authentication/login')
  .post(validate(loginUserValidation), loginUser);

router
  .route('/authentication/register')
  .post(setUserRoleMiddleware, validate(registerUserValidation), registerUser);

router
  .route('/authentication/updateUser')
  .put(protect, updateUserProfile);

router
  .route('/authentication/authenticatedProfile')
  .get(protect, getAuthenticatedProfile);

/************ Authorization Routes ****************/
router
  .route('/authorization')
  .get(serveAuthorizationCheck);

module.exports = router;