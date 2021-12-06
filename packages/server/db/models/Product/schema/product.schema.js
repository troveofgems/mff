const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true}
}, {
  timestamps: true
});

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Product Name Is Required']
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  reviewCount: {
    type: Number,
    required: true,
    default: 0
  },
  reviews: [reviewSchema],
  price: {
    type: Number,
    required: true,
    default: 0
  },
  publishedToShop: {
    type: Boolean,
    required: true,
    default: false
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true
  },
}, {
  timestamps: true
});

module.exports = ProductSchema;