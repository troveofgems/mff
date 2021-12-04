const ErrorResponse = require('../Error');

// Define Authorizations
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return ErrorResponse({
        message: 'Request Denied - Role does not provide the necessary privileges.',
        statusCode: 403
      }, req, res, next);
    }
  }
}