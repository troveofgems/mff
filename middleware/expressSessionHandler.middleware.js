const parseURL = require('parseurl');

const expressSessionHandlerMiddleware = (req, res, next) => {
  if(req.session.sessionId) {
    if (!req.session.views) {
      req.session.views = {};
    }

    console.log(req.session.sessionId, req.session);
    let requestedPathname = parseURL(req).pathname;

    req.session.views[requestedPathname] = (req.session.views[requestedPathname] || 0) + 1;

  } else {
    req.session.sessionId = req.session.cookie.genid(req);
  }
  next();
};

module.exports = expressSessionHandlerMiddleware;