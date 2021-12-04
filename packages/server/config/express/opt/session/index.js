const
  uidSafe = require('uid-safe'),
  session = require('express-session'),
  {
    insecurelyGenerateSessionToken
  } = require("../../../../utils/dev/server.utils"),
  expressSessionHandlerMiddleware = require('../../../../middleware/expressSessionHandler.middleware');

module.exports.configureSession = App => {
  const
    {
      NODE_ENV,
      SESSION_META_SECRET_TOKEN, SESSION_META_UID_LENGTH, SESSION_META_COOKIE_MAX_AGE
    } = process.env,
    IS_PRODUCTION = NODE_ENV === 'production',
    UID_LENGTH = SESSION_META_UID_LENGTH ?
      parseInt(SESSION_META_UID_LENGTH) : 18,
    MAX_COOKIE_AGE = SESSION_META_COOKIE_MAX_AGE ?
      parseInt(SESSION_META_COOKIE_MAX_AGE) : 7,
    SESSION_TOKEN = SESSION_META_SECRET_TOKEN ?
      SESSION_META_SECRET_TOKEN : insecurelyGenerateSessionToken();

  let configurableOptions = {
    secret: SESSION_TOKEN,
    cookie: {
      genid: function(req) {
        return req.sessionId = uidSafe.sync(UID_LENGTH);
      },
      httpOnly: !IS_PRODUCTION,
      maxAge: MAX_COOKIE_AGE,
      secure: IS_PRODUCTION,
    },
    resave: false,
    sameSite: 'strict',
    saveUninitialized: false,
  }

  App.use(session(configurableOptions));
  App.use(expressSessionHandlerMiddleware);

  return App;
};