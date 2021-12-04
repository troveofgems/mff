const hpp = require('hpp');
module.exports.enableHPP = App => App.use(hpp());

/* If Options Need To Be Defined, Disable Line 2 & Use This Instead:
module.exports.enableHPP = App => {
  //let configurableOptions = {};

  return App.use(hpp(/!*configurableOptions*!/));
};*/
