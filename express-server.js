const
  { PORT = 8080 } = process.env,
  express = require('express'),
  path = require('path'),
  rootEnvPath = `${__dirname}`,
  { configureExpress } = require('./config/express'),
  { createSemiSecureApplication } = require('./config/express/opt/security'),
  { openDatabaseConnection } = require('./config/db'),
  { mountRouterToApplication } = require("./router"),
  { attachCustomErrorHandlingMiddleware } = require('./middleware'),
  { attachCleanupProcessListeners } = require('./utils/dev/processListeners.utils');

const uploadProductImageRoute = require("./router/routes/api/upload.product-image.route");

const Application = createSemiSecureApplication();

let serverList = { expressServer: null, dbServer: null }; // To Track All Servers That Are Opened

configureExpress(Application, rootEnvPath); // Configure The Express Server

serverList.dbServer = openDatabaseConnection(); // Open Connection To DB

// TODO: Move code once working...
Application.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
Application.use('/api/upload', uploadProductImageRoute);

Application.use('/uploads', express.static(path.join(rootEnvPath, '/uploads')));

let PROD_PORT;
if (process.env.NODE_ENV === 'production') {
  PROD_PORT = process.env.PORT || 8080;
  console.log("PREP FOR DEV ENV - PRD1", PROD_PORT);
  let staticProdPath = path.join(rootEnvPath, '/client/build');
  console.log("Point Path To: ", staticProdPath);
  Application.use(express.static(staticProdPath));
}

mountRouterToApplication(Application); // Mount Router To Application

attachCustomErrorHandlingMiddleware(Application); // Enable Custom Error Handling

let portToListen = process.env.NODE_ENV === "production" ? PROD_PORT : PORT;
console.log('Listening On: ', portToListen);
serverList.expressServer = Application.listen(portToListen); // Set the application to listen to the given server port

attachCleanupProcessListeners(serverList); // Contains health-checks, event handlers: all application-process specific