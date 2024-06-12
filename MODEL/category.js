const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      }],
})


const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel