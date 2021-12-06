const
  MODEL_NAME = 'Order',
  mongoose = require('mongoose'),
  schema 	 = require('./schema/order.schema');

module.exports = mongoose.model(MODEL_NAME, schema);