const mongoose = require('mongoose');

const orderReviewSchema = new mongoose.Schema({
  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true}
}, {
  timestamps: true
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cartItems: [
    {
      name: {type: String, required: true},
      quantityRequested: {type: Number},
      sizeRequested: {type: String},
      hueRequested: {type: String},
      image: {type: String, required: true},
      price: {type: Number, required: true},
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      }
    }
  ],
  promoCode: {
    type: String
  },
  orderRefId: {
    type: String,
    required: true
  },
  shippingAddress: {
    ship_to_first_name: {
      type: String,
    },
    ship_to_last_name: {
      type: String,
    },
    address_1: {
      type: String,
      required: true
    },
    address_2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      enum: ['usa'],
      default: 'usa'
    }
  },
  billingAddress: {
    bill_to_first_name: {
      type: String,
    },
    bill_to_last_name: {
      type: String,
    },
    address_1: {
      type: String,
      required: true
    },
    address_2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      enum: ['usa'],
      default: 'usa'
    }
  },
  paymentMethod: {
    type: Number,
    required: true,
    default: 0
  },
  paymentResult: {
    id: {type: String},
    status: {type: String},
    update_time: {type: String},
    email_address: {type: String}
  },
  taxCost: {
    type: Number,
    required: true,
    default: 0.00
  },
  shippingCost: {
    type: Number,
    required: true,
    default: 0.00
  },
  cartCost: {
    type: Number,
    required: true,
    default: 0.00
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0.00
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  hasBeenCancelled: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  cancellationInitiatorId: {
    type: String
  },
  cancelledBy: {
    type: Number,
    enum: [0, 1]
  },
  markShippedInitiatorId: {
    type: String
  },
  hasBeenShipped: {
    type: Boolean,
    required: true,
    default: false
  },
  shippedOn: {
    type: Date
  },
  hasBeenDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  hasBeenRefunded: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredOn: {
    type: Date
  },
  isGuestCheckout: {
    type: Boolean,
    required: true,
    default: true
  },
  refundedOn: {
    type: Date
  },
  refundStatus: {
    type: String,
    enum: ["n/a", "pending", "issued"]
  },
  guestEmail: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = OrderSchema;