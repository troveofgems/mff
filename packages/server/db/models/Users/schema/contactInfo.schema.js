const
  AddressInfoSchema = require('./addressInfo.schema'),
  mongoose = require('mongoose');

const ContactInfoSchema = new mongoose.Schema({
  tel: [Number],
  address: {
    type: [AddressInfoSchema],
  }
}, {
  timestamps: true
});

module.exports = ContactInfoSchema;