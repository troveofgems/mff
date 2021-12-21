const {discoverObject} = require('../../middleware/Error/probe');
//  NOT FOUND HANDLER
/////////////////////
const notFound = (req, res, next) => {
  let error = { message: `Not Found: ${req.originalUrl}` };

  return res
    .status(404)
    .json({
      success: false,
      error,
      errorMessage: error.message || 'Server Error'
    });
};

//  SERVER ERROR HANDLER
////////////////////////
const errorHandler = (err, req, res, next) => {
  //console.log('error probe', err);
  let error = {};
  if (process.env.NODE_ENV === 'development') { console.error(err); }

  const { overrideErrorFromServer } = err;
  if (overrideErrorFromServer) { // Override All Errors From The Server To The Front End.
    const { overrideFrom, overrideMessage, statusCode } = err;

    error = { statusCode };

    if (overrideFrom === 'login') { // Security Point - Prevent Server Probes: Failed Logins get generic error messages.
      error = {
        ...error,
        emitErrorFrom: overrideFrom,
        message: overrideMessage
      };
    }
  }
  else if (err.name === 'MongoServerError') {
    switch (err.code) {
      case 11000:
        if (err.keyPattern['email']) {
          let message =
            (`The email address you've attempted to register with is taken: [${err.keyValue.email}].` +
              '\nIf you\'ve forgotten your password, please reset it');
          error = {
            statusCode: 400,
            message
          }
        }
        break;
      default:
        return 'Some Yet Uncatered-To Mongo Error.';
    }
  } else if (err.statusCode === 401) { // Any 401s should just reflect the server response message and status.
    error = {...err};
  } else {
    discoverObject(err);
    error = { message: 'Unspecified Server Error - Contact App Admin', statusCode: err.statusCode };
  }

  //console.log('TO OUTPUT: ', error);

  return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      error,
      errorMessage: error.message || 'Server Error'
    });
};

module.exports = {
  errorHandler,
  notFound
}