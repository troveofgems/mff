const
  bcryptjs = require("bcryptjs"),
  jwt = require('jsonwebtoken');

module.exports.encryptPassword = async function(next) {
  const
    { BCRYPT_GEN_ROUNDS } = process.env,
    ROUNDS = BCRYPT_GEN_ROUNDS ? parseInt(BCRYPT_GEN_ROUNDS) : 10,
    salt = await bcryptjs.genSalt(ROUNDS);

  this.password = await bcryptjs.hash(this.password, salt);

  next();
};

module.exports.getSignedJwt = function() {
  const
    {
      JWT_TOKEN_KEY, JWT_TOKEN_EXPIRATION_DEVTEST, JWT_TOKEN_EXPIRATION_PROD,
      NODE_ENV
    } = process.env,
    IS_PRODUCTION = NODE_ENV === 'production';

  return jwt.sign({ id: this._id }, JWT_TOKEN_KEY, {
    expiresIn: IS_PRODUCTION ? parseInt(JWT_TOKEN_EXPIRATION_PROD) : parseInt(JWT_TOKEN_EXPIRATION_DEVTEST)
  });
};

module.exports.verifyCredentials = async function(userEnteredPassword) {
  return await bcryptjs.compare(userEnteredPassword, this.password);
};