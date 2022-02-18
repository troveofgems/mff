const {errorHandler} = require('../Error');

// Define Authorizations
exports.authorize = () => {
  return (req, res, next) => {
    if (req.user.authLevel >= 2000) {
      return next(errorHandler({
        message: 'Forbidden - You Are Not Authorized.',
        statusCode: 403
      }, req, res, next));
    }
  }
}