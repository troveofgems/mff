const
  { authenticationController } = require("./handlers/authentication"),
  { authorizationController } = require("./handlers/authorization");

module.exports.authentorizationController = (() => {
  return {
    authentication: authenticationController,
    authorization: authorizationController,
  };
})();