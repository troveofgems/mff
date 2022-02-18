module.exports.serveStaticAssetsFrom = (App, projectDir, express) => {
  const
    pathTo_ExpressServer_PublicFolder = process.env.NODE_ENV === "production" ? "client/build" : `${projectDir}/public`,
    configurableOptions = {};

  configurableOptions.index = process.env.PUBLIC_SERVE_INDEX || false;
  configurableOptions.immutable = process.env.PUBLIC_SERVE_IMMUTABLE || true;
  configurableOptions.cacheControl = process.env.PUBLIC_SERVE_CACHE_CONTROL || true;
  configurableOptions.maxAge = process.env.SERVE_PUBLIC_ASSETS_MAX_CACHE_AGE || '14d'; // Based on a two week sprint

  App.use(
    [/*List Of Routes To Receive Static Assets*/],
    express.static(pathTo_ExpressServer_PublicFolder, configurableOptions)
  );

  return App;
};