const
  mongoose = require('mongoose');

const AddressInfoSchema = new mongoose.Schema({
  street_1: String,
  street_2: String,
  city: String,
  zipcode: String,
  country: {
    type: String,
    enum: ['Czechia', 'Japan', 'United States']
  }
}, {
  timestamps: true
});

module.exports = AddressInfoSchema;