const customErrorMiddleware = require('./Error');

module.exports.attachCustomErrorHandlingMiddleware = App => {
  App.use(customErrorMiddleware.notFound);
  App.use(customErrorMiddleware.errorHandler);
  return App;
}