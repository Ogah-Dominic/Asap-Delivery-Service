const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  items: [{
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    itemTotal: {
      type: Number,
      required: true
    },
    itemPrice: {
      type: Number,
      required: true
    },
    itemName: {
      type: String,
      required: true
    },
    itemImage: {
      type: String,
      required: true
    }
  }],
  cashBack: {
    type: Number,
  },
  grandTotal: {
    type: Number,
    default: 0
  }
});

const cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel