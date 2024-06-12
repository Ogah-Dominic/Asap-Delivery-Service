const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    surName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },
    cashBack: { 
        type: Number, 
        default: 0 
    }, 
    cashBackToggle: { 
        type: Boolean, 
        default: false 
    }, 
    orders: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order' 
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const userModel = mongoose.model('constumers', userSchema);

module.exports = userModel