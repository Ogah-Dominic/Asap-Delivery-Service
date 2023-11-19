const express = require("express")
const router = express()

const {
    register,
    AsapVerify,
    resendEmailVerification,
    signIn,
    forgottenPassword,
    resetPassword} = require("../CONTROLLER/controller")

    router.route("/signup").post(register);
    router.route("/verify/:token").put(AsapVerify);
    router.route("/resend-email-verification").get(resendEmailVerification,);
    router.route("/signin").post(signIn);
    router.route("/forgot-password").post(forgottenPassword);
    router.route("/reset-password").put(resetPassword);


    module.exports = router;