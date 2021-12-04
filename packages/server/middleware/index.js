const customErrorMiddleware = require('./Error');

module.exports.attachCustomErrorHandlingMiddleware = App => App.use(customErrorMiddleware);