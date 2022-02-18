const
  //AccountInfoSchema = require('./accountInfo.schema'),
  //AddressInfoSchema = require('./addressInfo.schema'),
  //ContactInfoSchema = require('./contactInfo.schema'),
  {
    encryptPassword,
    getSignedJwt,
    getResetPasswordToken,
    verifyCredentials
  } = require('../../../../utils/dev/schema.utils'),
  mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  lastLoggedIn: {
    type: Date,
    default: null
  },
  accountLockout: {
    type: Boolean,
    required: true,
    default: false
  },
  authLevel: {
    type: Number,
    enum: [
      10, // App Super User
      100, // App Admin
      1000, // App Auditor
      2000 // App User
    ],
    default: 2000
  },
  authTokenType: {
    type: Number,
    enum: [
      0,
      1
    ],
    default: 0
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
    max: 3
  },
  awaitingEmailVerification: {
    type: Boolean,
    required: false,
    default: false
  },
  birthMonth: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    required: [true, 'A Birth Month Is Required'],
    default: 12
  },
  currentEmail: {
    type: String,
    required: [true, 'An Email Address Is Required'],
    unique: true
  },
  placeholderEmail: {
    type: String,
    required: false
  },
  emailVerificationTo: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: [true, 'First Name Is Required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name Is Required']
  },
  pwdType: {
    type: Number,
    enum: [
      0,
      1
    ],
    default: 0
  },
  password: {
    type: String,
    required: [true, 'An Eight (8) Character Or Greater Password Is Required'],
    minlength: 8,
    select: false
  },
  rememberMyAddress: {
    type: Boolean,
    required: true,
    default: false
  },
  rememberMyCart: {
    type: Boolean,
    required: true,
    default: true
  },
  accountVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  isBanned: {
    type: Boolean,
    required: true,
    default: false
  },
  banExpiresAt: {
    type: Date,
    default: null
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpire: {
    type: Date
  }
/*, TODO: Split The Schemas At Some Point Low Priority - Knowledge Needed.
  accountInfo: {
    type: AccountInfoSchema
  },
  contactInfo: {
    type: ContactInfoSchema
  },
  addressInfo: {
    type: AddressInfoSchema
  }*/
}, {
  timestamps: true
});

UserSchema.pre('save', encryptPassword);
UserSchema.methods.getSignedJwt = getSignedJwt;
UserSchema.methods.verifyCredentials = verifyCredentials;
UserSchema.methods.getResetPasswordToken = getResetPasswordToken;

module.exports = UserSchema;