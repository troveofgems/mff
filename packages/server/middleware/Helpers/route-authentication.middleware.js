const
  jwt = require('jsonwebtoken'),
  {errorHandler} = require('../Error'),
  //{discoverObject} = require('../Error/probe'),
  asyncHandler = require('express-async-handler'),
  User = require('../../db/models/Users');

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  const
    handleInvalidRequest = additionalInfo => {
      const DEFAULT_MESSAGE = 'Not Authorized To Access This Route';
      let amendedMessage;
      if (additionalInfo) {
        switch(additionalInfo.name) {
          case 'TokenExpiredError':
            amendedMessage = `${DEFAULT_MESSAGE}::${additionalInfo.message} @ ${additionalInfo.expiredAt}`;
            break;
          default:
            break;
        }
      }
      return next(errorHandler({
        message: amendedMessage || DEFAULT_MESSAGE,
        statusCode: 401
      }, req, res, next));
    };

  let
    token,
    xAuthToken = req.headers['x-auth-token'];

  console.log("X-Auth-Token Is: ", req.headers['x-auth-token']);

  if (xAuthToken) {
    token = xAuthToken;
  }

  /* Not super sure if cookies should be used going forward...
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }*/

  if (!token) { // We have no token. Don't continue. No Detailed Message Needed.
    return console.log('NO Token Exists', req)//handleInvalidRequest();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (err) {
    return handleInvalidRequest(err);
  }
});