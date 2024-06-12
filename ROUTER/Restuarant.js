const express = require("express")
const router = express()
// Resturant Router
const {
    registerResturant,
    resturantVerify,
    resendEmailVerification,
    signIn,
    forgotPassword,
    resetPassword,
    logout,
    getAll,
    getOne,
    updateResturant,
    addProfileImage,
    deleterestaurant
} = require("../CONTROLLER/Restuarant");



      // Resturant Route
      router.route("/signup").post(registerResturant,validateResturrant);
      router.route("/verify/:token").put(resturantVerify);
      router.route("/resend-email-verification").get(resendEmailVerification);
      router.route("/signin").post(signIn,validateResturrant);
      router.route("/forgot-password").post(forgotPassword);
      router.route("/reset-password").put(resetPassword,validateResturrant,isAdmin)
      router.route("/logout").get(logout);
      router.route("/all").get(getAll);
      router.route("/one/:id").get(getOne);
      router.route("/updateResturant/:id").put(updateResturant)
      router.route("/update-resturant-imageprofile/:id").put(addProfileImage)
      router.route("/deleteResturant/:id").delete(deleterestaurant)
  module.exports = router