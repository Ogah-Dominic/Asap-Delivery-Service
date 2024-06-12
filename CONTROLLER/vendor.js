require('dotenv').config();
const userModel = require('../MODEL/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mailTemplate, forgotMailTemplate } = require('../middleware/mailTemplate');
const { sendEmail } = require('../middleware/sendMail');
const RevokedToken = require('../models/revokedTokenModel')

// USER ONBOARDING

// user sign up
exports.vendorSignUp = async (req, res) => {
  try {
    const {contact, email, password, confirmPassword } = req.body;

    const emailExists = await vendorModel.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: `Email already exist.`
      })
    }

    // salt and hash the password using bcrypt
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const data = {
      fullName: fullName.toUpperCase(),
      email: email.toLowerCase(),
      contact,
      password: hashedPassword
    }

    // create a vendor
    const user = await vendorModel.create(data);

    // create a token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "10 mins" })
    console.log(token)

    const protocol = req.protocol;
    const host = req.get("host");
    const subject = "Email Verification";
    const link = `${req.protocol}:${req.get("host")}${token}`;
    //const link`https://PointPlus-app.vercel.com/#/verification/${token}`;
    const html = await mailTemplate(link, vendor.fullName);
    const mail = {
      email: email,
      subject,
      html,
    };
    sendEmail(mail);

    // save the vendor
    const savedVendor = await vendor.save();

    // return a response
    res.status(201).json({
      message: `Check your email: ${savedVendor.email} to verify your account.`,
      data: savedVendor
    })

  } catch (error) {
    res.status(500).json({
      Error: error.message
    })
  }
}


// verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(404).json({
        error: "Token not found"
      })
    }

    // verify the token and extract the vendor's email
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const vendor = await vendorModel.findOne({ email: email.toLowerCase() });

    if (!vendor) {
      return res.status(404).json({
        error: "vendor not found"
      });
    }

    // Check if vendor has already been verified
    if (vendor.isVerified) {
      return res.status(400).json({
        error: "vendor already verified"
      });
    }

    // update the user verification and save changes to database
    vendor.isVerified = true;
    await vendor.save();

    res.status(200).json({
      message: "vendor verified successfully",
      data: vendor,
    })
    // res.status( 200 ).redirect( `${req.protocol}://${req.get("host")}/api/log-in` );

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};


// resend verification
exports.resendVerificationEmail = async (req, res) => {
  try {
    // get vendor email from request body
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        error: "Please enter email address"
      });
    }

    // find vendor
    const vendor = await vendorModel.findOne({ email: email.toLowerCase() });
    if (!vendor) {
      return res.status(404).json({
        error: "vendor not found"
      });
    }

    // Check if vendor has already been verified
    if (vendor.isVerified) {
      return res.status(400).json({
        error: "vendor already verified"
      });
    }

    // create a token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10 mins" });

    const subject = "Email Verification";
    const link = `https://PointPlus-app.vercel.com/#/verification/${token}`;
    // const link = `${req.protocol}:${req.get("host")}${token}`;
    const html = await mailTemplate(link, vendor.fullName);
    const mail = {
      email: email,
      subject,
      html,
    };
    sendEmail(mail);

    res.status(200).json({
      message: `Verification email sent successfully to your email: ${vendor.email}`
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        error: "Please enter email address"
      });
    }

    // Check if the email exists in the vendorModel
    const vendor = await vendorModel.findOne({ email: email.toLowerCase() });
    if (!vendor) {
      return res.status(404).json({
        message: `Vendor with the email ${email} not found`
      });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

    const subject = "Password Reset";
    const link = `https://PointPlus-app.vercel.com/#/resetpassword/${resetToken}`;
    // const link = `${req.protocol}:${req.get("host")}${token}`;
    const html = await forgotMailTemplate(link, vendor.fullName);
    const mail = {
      email: email,
      subject,
      html,
    };
    sendEmail(mail);
    
    res.status(200).json({
      message: `Password reset email sent successfully to ${email}`
    });

  } catch (error) {
    console.error("Something went wrong", error.message);
    res.status(500).json({
      message: error.message
    });
  }
};


// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(404).json({
        error: "Please enter a new password"
      });
    }

    // Verify the vendor's token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the vendor's ID from the token
    const vendorId = decodedToken.vendorId;

    // Find the user by ID
    const vendor = await vendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        message: "vendor not found"
      });
    }

    // Salt and hash the new password
    const saltedRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltedRound);

    // Update the vendor's password
    vendor.password = hashedPassword;
    await vendor.save();

    res.status(200).json({
      message: "Password reset successful"
    });
  } catch (error) {
    console.error("Something went wrong", error.message);
    res.status(500).json({
      message: error.message
    });
  }
};


// User login
exports.userLogin = async (req, res) => {
  try {
    // Extract the vendor's email and password
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        error: "Please enter all fields"
      });
    }

    // Find vendor by their registered email
    const vendor = await vendorModel.findOne({ email: email.toLowerCase() })

    // Check if the vendor exists
    if (!vendor) {
      return res.status(404).json({
        Failed: `vendor with the email ${email} not found`
      })
    }

    // Compare vendor's password with the saved password.
    const checkPassword = bcrypt.compareSync(password, vendor.password)
    // Check for password error
    if (!checkPassword) {
      return 
      res.status(404).json({
        Message: 'Login Unsuccessful',
        Failed: 'Invalid password'
      })
    }

    // Check if the vendor if verified
    if (!vendor.isVerified) {
      return 
      res.status(404).json({
        message: `Email Not Verified, Please verify your email to log in.`
      })
    }

    const token = jwt.sign({
      vendorId: vendor._id,
      email: vendor.email,
      isAdmin: vendor.isAdmin,
      isSuperAdmin: vendor.isSuperAdmin
    },
      process.env.JWT_SECRET, { expiresIn: "10 min" })

    vendor.save()

    res.status(200).json({
      message: 'Login successful',
      fullName: vendor.fullName,
      email: vendor.email,
      message: token
    })

  } catch (error) {
    res.status(500).json({
      Error: error.message
    })
  }
}

// Change Password
const changePassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, existingPassword } = req.body;
    if (!newPassword || !existingPassword) {
      return 
      res.status(404).json({
        error: "Please enter all fields"
      });
    }

    // Verify the vendor's token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the vendor's Id from the token
    const vendorId = decodedToken.vendorId;

    // Find the vendor by ID
    const vendor = await vendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        message: "vendor not found"
      });
    }

    // Confirm the previous password
    const isPasswordMatch = await bcrypt.compare(existingPassword, vendor.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Existing password is incorrect."
      });
    }

    // Salt and hash the new password
    const saltedRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltedRound);

    // Update the vendor's password
    vendor.password = hashedPassword;
    await vendor.save();

    res.status(200).json({
      message: "Password changed successful"
    });
  } catch (error) {
    console.error("Something went wrong", error.message);
    res.status(500).json({
      message: error.message
    });
  }
};


// vendor sign out
exports.signOut = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return 
      res.status(401).json({
        message: 'Missing token'
      });
    }

    const token = authorizationHeader.split(' ')[1];

    // Create a new revoked token entry and save it to the database
    const revokedToken = new RevokedToken({
      token: token
    });

    await revokedToken.save();

    res.status(200).json({
      message: 'vendor logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message
    });
  }
};


// USER CRUD


// Update User
const updateVendor = async (req, res) => {
  try {
    const { vendorId } = req.user;
    const { fullName, email, contact } = req.body;

    const vendor = await vendorModel.findById(vendorId)

    if (!vendor) {
      return 
      res.status(200).json({
        message: `Vendor with Id: ${userId} not found`,
      })
    }

    // Construct the data object based on the fields present in the request body
    const data = {};

    if (fullName) {
      data.fullName = fullName.toUpperCase();
    }

    if (contact) {
      data.contact = contact;
    }

    if (email) {
      data.email = email.toLowerCase();
      const emailExists = await vendorModel.findOne({ email: email.toLowerCase() })
  
      if (emailExists && emailExists._id.toString() !== vendorId) {
        return 
        res.status(400).json({
          message: `Email already exists.`
        })
      }
    }
    
    const update = await vendorModel.findByIdAndUpdate(vendorId, data, { new: true })

    res.status(200).json({
      message: 'Vendor updated successfully',
      data: update
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      Error: error.message
    })
  }
}



// Delete vendor
const deleteVendor = async (req, res) => {
  try {
    const vendorId = req.user.vendorId
    const vendor = await vendorModel.findById(vendorId);
    if (!vendor) {
      return 
      res.status(401).json({
        message: `vendor with id: ${vendorId} not found`,
      })
    }
    const deletedvendor = await vendorModel.findByIdAndDelete(vendorId)
    res.status(200).json({
      message: 'Vendor deleted successfully',
    })

  } catch (error) {
    res.status(500).json({
      Error: error.message
    })
  }
}

module.exports = {
  userSignUp,
  userLogin,
  signOut,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  changePassword,
  resetPassword,
  updateUser,
  deleteUser
}