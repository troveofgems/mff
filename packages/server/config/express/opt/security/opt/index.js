// This file is a shell export wrapper
const
  helmet = require('./helmet'),
  hpp = require('./hpp'),
  mongoSanitize = require('./mongoSanitize'),
  rateLimit = require('./rateLimit'),
  xssClean = require('./xssClean');

module.exports.securityPolicies = {
  helmetize: helmet.helmetize,
  enableHPP: hpp.enableHPP,
  enableMongoSanitize: mongoSanitize.enableMongoSanitize,
  enableRateLimiting: rateLimit.enableRateLimiting,
  enableXSSClean: xssClean.enableXSSClean
};