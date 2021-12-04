module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') { console.error(err.stack); }
  let error = { message: err.message, ...err };

let
  namedMongooseErrors = ['CastError', 'ValidationError'],
  codedMongooseErrors = [11000];

  return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      error,
      errorMessage: error.message || 'Server Error'
    });
};