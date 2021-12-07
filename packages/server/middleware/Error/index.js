const notFound = (req, res, next) => {
  let error = { message: `Not Found: ${req.originalUrl}` };

  return res
    .status(404)
    .json({
      success: false,
      error,
      errorMessage: error.message || 'Server Error'
    });
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') { console.error(err); }
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

module.exports = {
  errorHandler,
  notFound
}