const
  bcryptjs = require("bcryptjs"),
  jwt = require('jsonwebtoken');

module.exports.encryptPassword = async function(next) {
  console.log('Inside Encrypt Password', this);
  const
    encryptThePassword = async () => {
      const
        { BCRYPT_GEN_ROUNDS } = process.env,
        ROUNDS = BCRYPT_GEN_ROUNDS ? parseInt(BCRYPT_GEN_ROUNDS) : 10,
        salt = await bcryptjs.genSalt(ROUNDS);

      return this.password = await bcryptjs.hash(this.password, salt);
    };

  const isRequestToUpdateWithoutPassword = this.__v >= 0 && this.password === undefined;
  if (isRequestToUpdateWithoutPassword) {
    // This is an update without an update to the password field. Simply Continue.
    return next();
  } else if (this.password) { // This is either registration or the password has been updated.
    await encryptThePassword();
  }

  return next();
};

module.exports.getSignedJwt = function() {
  const
    {
      JWT_TOKEN_KEY, JWT_TOKEN_EXPIRATION_DEVTEST, JWT_TOKEN_EXPIRATION_PROD,
      NODE_ENV
    } = process.env,
    IS_PRODUCTION = NODE_ENV === 'production';

  return jwt.sign({ id: this._id }, JWT_TOKEN_KEY, {
    expiresIn: IS_PRODUCTION ? JWT_TOKEN_EXPIRATION_PROD : JWT_TOKEN_EXPIRATION_DEVTEST
  });
};

module.exports.verifyCredentials = async function(userEnteredPassword) {
  return await bcryptjs.compare(userEnteredPassword, this.password);
};