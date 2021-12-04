const
  {
    authentication: {
      serveSanityCheck: serveAuthenticationCheck, registerUser, loginUser
    },
    authorization: {
      serveSanityCheck: serveAuthorizationCheck
    }
  } = require('../../../controllers/api/authentorization').authentorizationController,
  express = require('express'),
  { validate } = require('express-validation'),
  router = express.Router(),
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
  .post(validate(registerUserValidation), registerUser);

/************ Authorization Routes ****************/
router
  .route('/authorization')
  .get(serveAuthorizationCheck);

module.exports = router;