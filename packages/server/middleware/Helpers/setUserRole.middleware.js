module.exports.setUserRoleMiddleware = (req, res, next) => {
  req.body.isAppAdmin = false; // Admins will be set in a completely different way. All users begin @ 'base'
  next();
};