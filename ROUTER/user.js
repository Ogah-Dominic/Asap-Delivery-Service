const express = require("express")
const router = express()

    // User Router
    const{
        userSignUp,
        userLogin,
        signOut,
        verifyEmail,
        resendVerificationEmail,
        forgottenPassword,
        changePassword,
        getOne,
        getAll,
        search,
        resetPassword,
        updateUser,
        deleteUser} = require("../CONTROLLER/user")

        
  
    // User route
    router("/signup").post(validateResturrant,userSignUp);
    router("/verify/:token").put(verifyEmail);
    router("/resend-email-verification").get(resendVerificationEmail);
    router("/signin").post(validateResturrant,userLogin);
    router("/forgot-password").post(forgottenPassword);
    router("/reset-password").put(validateResturrant,isAdmin,resetPassword,)
    router("/change-password").put(changePassword)
    router("/logout").get(signOut);
    router("/all").get(getAll);
    router("/search").get(search);
    router("/one/:id").get(getOne);
    router("/updateuser/:id").put(updateUser)
    router("/deleteuser/:id").delete(deleteUser)

    module.exports = router;