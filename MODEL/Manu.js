const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  restaurantImage: {
    type: String,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  restaurantDesc: {
    type: String,
    required: true,
  },
  foodDesc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  itemImage: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

});

const menuModel = mongoose.model('Menu', menuSchema);
module.exports = menuModel