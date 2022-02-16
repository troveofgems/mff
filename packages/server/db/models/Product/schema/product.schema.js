const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
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
  brand: { // To Deprecate This
    type: String
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
  stockType: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    default: 0
  },
  stockCount: {
    type: Number,
    default: 0
  },
  hueOptionsAvailable: {
    type: Boolean,
    required: true,
    default: false
  },
  sizeOptionsAvailable: {
    type: Boolean,
    required: true,
    default: false
  },
  promoCodesAvailable: {
    type: Boolean,
    required: true,
    default: false
  },
  hueOptionList: [{type: mongoose.Schema.Types.Mixed}],
  promoCodeList: [{type: String}],
  productRefId: {
    type: String
  },
  sizeOptionList: {
    regularSizeList: { type: mongoose.Schema.Types.Mixed },
    adjustableSizeList: { type: mongoose.Schema.Types.Mixed }
  }
}, {
  timestamps: true
});

module.exports = ProductSchema;