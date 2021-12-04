const expressRateLimiter = require('express-rate-limit');
module.exports.enableRateLimiting = App => {
  let configurableOptions = {};

  // Fine-Tune Rate Limiting
  const
    { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } = process.env.RATE_LIMIT_WINDOW_MS,
    predefinedTimer = RATE_LIMIT_WINDOW_MS,
    predefinedRequestLimit = RATE_LIMIT_MAX_REQUESTS;

  let rateLimitTimer = predefinedTimer ? parseInt(RATE_LIMIT_WINDOW_MS) : 10;
  configurableOptions.windowMS = rateLimitTimer * 60 * 1000; // 10 Default Minutes
  configurableOptions.max = predefinedRequestLimit ?
    parseInt(RATE_LIMIT_MAX_REQUESTS) : 500; // 500 Requests per minute per user

  return App.use(expressRateLimiter(configurableOptions));
};