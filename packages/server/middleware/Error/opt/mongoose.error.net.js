const ErrorResponse = require("../../../class/ErrorResponse");
module.exports.processMongooseErrors = (e, errObj) => {
  if (e.name === 'CastError') { // Mongoose Bad Object Id
    const message = `Resource Not Found: ${e.value}`;
    errObj = new ErrorResponse(message, 404);
  }

  if (e.code === 11000) { // Mongoose Duplicate Key
    const message = 'Remove Duplicate Keys - They Are Not Allowed';
    errObj = new ErrorResponse(message, 400);
  }

  if (e.name === 'ValidationError') { // Mongoose Validation Error
    const message = Object.values(e.errors).map(errValue => errValue.message);
    errObj = new ErrorResponse(message, 400);
  }

  return errObj;
};