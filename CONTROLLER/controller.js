const AsapModel = require("../MODEL/model")
const jwt = require("jsonwebtoken")
const { decodeToken }= require("../UTILI/jwt")

exports.register = async(req, res)=>{
    try {
        const{
            Name,
            Email,
            PhoneNumber,
            Password,
            ConfiirmPassword}=req.body
            const isEmail = await AsapModel.findOne({Email})
            if(Password=== ConfirmPassword){
            if(isEmail){
                res.status(401).json({
                    message: "Email already Exist"
                })
            }else{
                const salt = bcrypt.genSync(10)
                const hash = bcrypt.hashSync(Password, salt)
                const image = await cloudinary.uploader.upload(req.files.profileImage.tempFilePath)
                const user = await AsapModel.create(req.body, {
                    Email: Email.toLowerCase(),
                    Password: hash,
                    ConfirmPassword: hash,
                    profileImage: image.secure_url
                });

                const token = await genToken(Asap._id, "1d")
                const subject = "ASAP DELIVERY Service";
                const link = `${req.protocol}:${req.get(host)}:${token}`
                const message = `Welcome to Asap Delivery Service kindly use the ${link} to verify your account.`
                const data = {
                    Email:Email,
                    subject,
                    message
                };
                sendEmail(data);
                res.status(200).json({
                    success: true,
                    data: user
                });
            }
            }else{
                res.status(400).json({
                    message: "password and confirm password most match"
                });
            }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.AsapVerify = async(req, res)=>{
    try {
        const {token} = req.params;
        const AsapInfo = await decodeToken(token)
        if(AsapInfo){
            await AsapModel.findByAndUpdate(AsapInfo._id, {isVerified: true});
            res.status(200).json({
               message: "Verification Successful"
            })
        }else{
            throw new Error("Error verifing your account please try again")
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.resendEmailVerification = async(req, res)=>{
    try {
        const { Email }=req.body
        const Asap = await AsapModel.findOne(Email)
        if(Asap && !Asap.isVerified){
            const token = await genToken(Asap._id, "id");
            const subject = "Asap Delivery"
            const link = `${req.protocol}://${req.get("host")}:/reset/verify/${token}`
            const message = `Welcome to Asap Delivery Service  kindly use the ${link} to re-verify your account`
            const data = {
                Email: Email,
                subject,
                message
            };
            sendEmail(data);
            res.status(200).json({
                message: `verification sent to ${Email}`
            })
        }else if(Asap?.isVerified){
            res.status(200).json({
                message: "Asap Delivery Service already Verified"
            })
        }else{
            res.status(404).json({
                message: `Asap Delivery Service with ${Email} not found`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.signIn = async(req,res)=>{
    try {
        const {Email, Password} = req.body;
        const Asap = await AsapModel.findOne({Email});
        if(!Asap.Email){
            res.status(400).json({
                message: "Wrong email pls try again"
            })
        }else{
            let checkPassword = false;
            if(Asap){
                checkPassword = bcrypt.compareSync(Password, Asap.Password)
            }
            if(!checkPassword){
                res.status(400).json({
                    message: "Wrong password please try again"
                })
            }else if(Asap.isBlocked){
                res.status(402).json({
                    message: "Asap Delivery Service is blocked"
                });
            }else if(!Asap.isVerified){
                const token = await genToken(Asap._id, "1d")
                const subject = "Verify now";
                const link = `${req.protocol}://${req.get("host")}:/verify/now/${token}`
                const message = `kindly re-verify your account with the ${link}`
                const data = {
                    Email: Email,
                    subject,
                    message
                };
                sendEmail(data)
                res.status(201).json({
                    message: `check your email ${Email} to verify your account`,
                })
            }else{
                Asap.isVerified = true
                const token = await genToken(Asap._id, "1d")
                await Asap.save()
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.forgottenPassword = async(req,res)=>{
    try {
        const { Email} = req.body;
        const Asap = await AsapModel.findOne({Email})
        if(Asap){
            const subject = "forgotten password"
            const token = await genToken(Asap._id, "1d")
            const link = `${req.protocol}:${req.get("host")}:/reset/password/${token}`
            const data = {
                Email: Email,
                subject,
                message
            };
            sendEmail(data)
            res.status(200).json({
                message: `check your email ${Email} for reset password`
            })
        }else{
            res.status(404).json({
                message: `This email ${Email} can not be found`
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.resetPassword = async(req,res)=>{
    try {
    const {token} = req.params
    const {Password} = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashdPassword = bcryptjs.hashSync(Password, salt)
    const AsapInfo = await decodeToken(token)
    const Asap = await AsapModel.findByIdAndUpdate(AsapInfo._id, {Password: hashdPassword, new: true});
    if(Asap){
        res.status(200).json({
            message: "Password reset successfully"
        })
    }else{
        res.status(401).json({
            message: "Error changing Password"
        })
    }
   
   } catch (error) {
        res.status(500).json({
            message: error.masssge
         })
     }

};