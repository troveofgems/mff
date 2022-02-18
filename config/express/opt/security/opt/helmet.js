const helmet = require('helmet');
module.exports.helmetize = () => {
  let configurableOptions = {};

  // Fine-Tuned CSP Options
  configurableOptions.contentSecurityPolicy = {
    useDefaults: true
  };

  return helmet(configurableOptions);
};