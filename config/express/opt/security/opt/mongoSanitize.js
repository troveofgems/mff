const mongoSanitize = require('express-mongo-sanitize');
module.exports.enableMongoSanitize = App => App.use(mongoSanitize());

/* If Options Need To Be Defined, Disable Line 2 & Use This Instead:
module.exports.enableXSSClean = App => {
  //let configurableOptions = {};

  return App.use(xssClean(/!*configurableOptions*!/));
};*/
