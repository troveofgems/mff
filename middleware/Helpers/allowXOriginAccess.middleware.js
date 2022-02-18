// Be sure you absolutely need this before pushing into production...
// This is not connected atm
module.exports.allowXOriginAccess = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin,x-requested-with,Content-Type,Accept,Authorization");
  next();
}