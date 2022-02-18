const xssClean = require('xss-clean');
module.exports.enableXSSClean = App => App.use(xssClean());

/* If Options Need To Be Defined, Disable Line 2 & Use This Instead:
module.exports.enableXSSClean = App => {
  //let configurableOptions = {};

  return App.use(xssClean(/!*configurableOptions*!/));
};*/