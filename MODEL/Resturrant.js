const mongoose = require("mongoose");
const PointPlusSchema = mongoose.Schema({
    ResturrantName:{
        type: String,
        require: true
    },
    Image:{
        type: String
    },
    Email:{
        type: String,
        require: true
    },
    PhoneNumber:{
        type: String,
        require: true
    },
    Password:{
        type: String,
        require: true
    },
    ConfirmPassword:{
        type: String,
        require: true
    },
    timeOrdering:{
        type: String,
        require: true
    },
    isloggedin:{
        type: Boolean,
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

const RestaurantModel = mongoose.model("Point+", PointPlusSchema)
module.exports = RestaurantModel