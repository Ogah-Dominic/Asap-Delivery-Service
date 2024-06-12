const mongoose = require("mongoose")

const riderSchema = new mongoose.Schema({

    RiderFirstName:{
        type: String,
        required: true
    },
    RiderLastName:{
        type: String,
        required: true
    },
    RiderAddree:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        require: true
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        require: true
    },
    confirmPassword:{
        type: String,
        require: true
    },
    isVerified:{
        type: Boolean
    },
    isAdmin:{
        type: Boolean
    },
    bikePlateNumber:{
        type: String,
        required: true
    },
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Google.map"
    },
    ProfileImage:{
        type: Object,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    restuarrant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resturrant"
    },
    manu:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manu"
    },
},(timestamp))
const ridermodel = model.mongoose("RIder",riderSchema )
module.exports = ridermodel

  
