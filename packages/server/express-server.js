const
  { // Environment variables are managed by dotenv as a preloaded file. More Info @ ./config/env/README.md
    USE_DEFAULT_PORT,
    SERVE_DEFAULT_PORT, SERVE_CUSTOM_PORT
  } = process.env,
  PORT = (USE_DEFAULT_PORT === 'true') ? SERVE_DEFAULT_PORT : SERVE_CUSTOM_PORT,
  express = require('express'),
  path = require('path'),
  { configureExpress } = require('./config/express'),
  { createSemiSecureApplication } = require('./config/express/opt/security'),
  { openDatabaseConnection } = require('./config/db'),
  { mountRouterToApplication } = require("./router"),
  { attachCustomErrorHandlingMiddleware } = require('./middleware'),
  { attachCleanupProcessListeners } = require('./utils/dev/processListeners.utils');

const uploadProductImageRoute = require("./router/routes/api/upload.product-image.route");

const Application = createSemiSecureApplication();

let serverList = { expressServer: null, dbServer: null }; // To Track All Servers That Are Opened

configureExpress(Application, __dirname); // Configure The Express Server

serverList.dbServer = openDatabaseConnection(); // Open Connection To DB

mountRouterToApplication(Application); // Mount Router To Application

// TODO: Move code once working...
Application.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
Application.use('/api/upload', uploadProductImageRoute);

const ___dirname = path.resolve();
Application.use('/uploads', express.static(path.join(___dirname, '/uploads')));

attachCustomErrorHandlingMiddleware(Application); // Enable Custom Error Handling

serverList.expressServer = Application.listen(PORT); // Set the application to listen to the given server port

attachCleanupProcessListeners(serverList); // Contains health-checks, event handlers: all application-process specific