const
  crypto = require('crypto'),
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

  if (!this.isModified('password')) {
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

module.exports.getResetPasswordToken = async function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Set The ResetToken Value
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set An Expiration of 10 Minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};