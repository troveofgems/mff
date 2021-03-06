const path = require("path");
module.exports.mountRouterToApplication = Application => {
  const // This is the main mainRouter. It bundles all sub-routes and mounts them to the application
    eb_designator = process.env.API_DESIGNATOR || '/api/',
    eb_apiVersion = process.env.API_VERSION || 'v1',
    eb_apiPrefix = `${eb_designator}${eb_apiVersion}`,
    backend_apiRoutes = ['sanityChecks', 'authentorization', 'l1rAdmin', 'product', 'order'],
    ef_designator = process.env.EFE_DESIGNATOR || '/efe/',
    ef_Version = process.env.EFE_VERSION || 'v1',
    ef_prefix = `${ef_designator}${ef_Version}`,
    expressFrontEnd_Routes = [];

  // Mount Routes To The Application
  backend_apiRoutes
    .forEach(route => (
      Application.use(
        `${eb_apiPrefix}/${route}`,
        require(`./routes${eb_designator}${route}.route`))
      )
    );

  expressFrontEnd_Routes
    .forEach(route => (
      Application.use(
        `${ef_prefix}/${route}`,
        require(`./routes${ef_designator}${route}.route`))
      )
    );

  if (process.env.NODE_ENV === "production") {
    Application.get("*", (req, res) => {
      let projectPath = path.resolve(__dirname, '..', 'client', 'build', 'index.html');
      console.log('Try to send file back', projectPath);
      return res.sendFile(projectPath);
    });
  }

  return Application;
}