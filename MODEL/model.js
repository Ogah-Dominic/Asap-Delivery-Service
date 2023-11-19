const mongoose = require("mongoose");
const AsapSchema = mongoose.Schema({
    Name:{
        type: "String",
        require: [true, "Name is required"]
    },
    Address:{
        type: "String",
        require: [true, "Address is required"]
    },
    
    profileImage:{
        type: "String"
    },
    Email:{
        type: "String",
        require: [true, "Email is required"]
    },
    PhoneNumber:{
        type: "String",
        require: [true, "PhoneNumber is required"]
    },
    Password:{
        type: "String",
        require: [true, "Password is required"]
    },
    ConfirmPassword:{
        type: "String",
        require: [true, "ConfirmPassword is required"]
    },
    isloggedin:{
        type: "Boolean",
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      }
});

const AsapModel = mongoose.model("ASAP Delivery", AsapSchema)
module.exports = AsapModel