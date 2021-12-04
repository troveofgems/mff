const express = require('express');
const
  {
    helmetize,
    enableHPP, enableMongoSanitize, enableRateLimiting, enableXSSClean
  } = require('./opt').securityPolicies;

module.exports.createSemiSecureApplication = () => {
  const SecuredExpressApp = express().use(helmetize()); // Create The Express App With Helmet

  // Configure All Other Security Policies
  enableHPP(SecuredExpressApp);
  enableMongoSanitize(SecuredExpressApp);
  enableRateLimiting(SecuredExpressApp);
  enableXSSClean(SecuredExpressApp);

  return SecuredExpressApp;
};