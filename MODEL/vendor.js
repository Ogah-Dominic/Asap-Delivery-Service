const mongoose = require('mongoose')
const vendorSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
        required: true
    },
    profileImage:{
        type: Object,
        reqired: true
    },
    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },
    resturrant:{
        type: mongoose.schema.Type.ObjectId,
        ref: "Resturrant"
    },
    manu:[{
        type: mongoose.schema.Type.ObjectId,
        ref: "manu"
    }],

    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },

},(timeStamp));

const vendorModel = mongoose.model("vendors", vendorSchema)
mondule.exports = vendorModel
