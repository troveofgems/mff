const jwt = require('jsonwebtoken'),
  asyncHandler = require('async-handler.middleware').asyncHandler,
  ErrorResponse = require('../Error'),
  User = require('../../db/models/users');

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse({
      message: 'Not Authorized To Access This Route',
      statusCode: 401
    }, req, res, next));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (err) {
    return next(new ErrorResponse({
      message: 'Not Authorized To Access This Route',
      statusCode: 401
    }, req, res, next));
  }
});