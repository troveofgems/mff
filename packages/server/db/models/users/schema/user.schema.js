const
  AccountInfoSchema = require('./accountInfo.schema'),
  AddressInfoSchema = require('./addressInfo.schema'),
  ContactInfoSchema = require('./contactInfo.schema'),
  {
    encryptPassword,
    getSignedJwt,
    verifyCredentials
  } = require('../../../../utils/dev/schema.utils'),
  mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First Name Is Required']
  },
  middleInitial: {
    type: String
  },
  lastName: {
    type: String,
    required: [true, 'Last Name Is Required']
  },
  email: {
    type: String,
    required: [true, 'An Email Address Is Required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'A 16 Character Password Is Required'],
    minlength: 16,
    select: false
  },
  accountInfo: {
    type: AccountInfoSchema
  },
  contactInfo: {
    type: ContactInfoSchema
  },
  addressInfo: {
    type: AddressInfoSchema
  }
}, {
  timestamps: true
});

UserSchema.pre('save', encryptPassword);
UserSchema.methods.getSignedJwt = getSignedJwt;
UserSchema.methods.verifyCredentials = verifyCredentials;

module.exports = UserSchema;