const morgan  = require('morgan');
module.exports.configureLoggers = App => App.use(morgan('dev'));