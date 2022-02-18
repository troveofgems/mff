const express = require('express');
module.exports.configureExpress = (Application, projectDir) => {
  if (process.env.NODE_ENV === 'development') { // Set Dev Specific Middleware
    require('./opt/loggers') // Set Loggers
      .configureLoggers(Application);
    require('colors');
  }

  require('./opt/templateEngine') // Set Express Template Engine
    .setTemplatingEngine(Application, projectDir);

  require('./opt/dataConverter') // Set Express Data Converters
    .configureDataConverters(Application, express);

  require('./opt/session') // Configure Express Session
    .configureSession(Application);

  require('./opt/staticAssets') // Configure Where To Serve Static Assets From
    .serveStaticAssetsFrom(Application, projectDir, express);//

  return Application;
};