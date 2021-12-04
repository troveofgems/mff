/*Enabling CORS is something that should be carefully considered as it can be very dangerous*/
/*It relaxes security applied to an API. It's lazy and stupid. Enabling it can open the application to
*  a CSRF vulnerability and/or exposure of protected data
* /
/*Only enable the code in this file if absolutely necessary. You will need to install the package.*/

/*
const CORS = require('cors');
module.exports.enableCORSForExpressAPIs = App => App.use(CORS());*/
module.exports = null;