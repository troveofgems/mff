const
  mongoose = require('mongoose'),
  { roleList } = require('../../../data/roleList'),
  { NODE_ENV, MAX_LOGIN_ATTEMPTS_DEV, MAX_LOGIN_ATTEMPTS_PROD } = process.env,
  IS_PRODUCTION = NODE_ENV === 'production';

const AccountInfoSchema = new mongoose.Schema({
  accountLockout: Boolean,
  loginAttempts: {
    type: Number,
    default: 0,
    max: IS_PRODUCTION ? MAX_LOGIN_ATTEMPTS_PROD : MAX_LOGIN_ATTEMPTS_DEV
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: {
    type: String,
    enum: roleList,
    default: 'user'
  }
}, {
  timestamps: true
});

module.exports = AccountInfoSchema;