require('dotenv').config();
const userModel = require("../MODEL/user");
const RiderModel = require("../MODEL/rider")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { mailTemplate, forgotMailTemplate } = require('../middleware/mailTemplate');
const { sendEmail } = require("../MIDDLEWARE/Email");
const RevokedToken = require("../MODEL/RevokeToken");
const { find } = require('../MODEL/user');

// RIDER ONBOARDING

// rider sign up
exports.riderSignUp = async (req, res) => {
  try {
    const {
      phoneNumber,
      email, 
      password, 
      confirmPassword } = req.body;

    const emailExists = await RiderModel.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: `Email already exist.`
      })
    }

    // salt and hash the password using bcrypt
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(password,confirmPassword, salt)
    const data = {
      riderFirstName: riderFirstName.toUpperCase(),
      riderlastName: riderlastName.toUpperCase(),
      email: email.toLowerCase(),
      phoneNumber,
      password: hashedPassword,
      confirmpassword: hashedPassword
    }

    // create a rider
    const rider = await RiderModel.create(data);

    // create a token
    const token = jwt.sign({ riderId: rider._id, email: rider.email }, process.env.JWT_SECRET, { expiresIn: "5 mins" })
    // console.log(token)

    const protocol = req.protocol;
    const host = req.get("host");
    const subject = "Email Verification";
    const link = `https://PointPlus-app.onrender.com/#/verification/${token}`;
    const html = await mailTemplate(link, user.SurName + + LastName);
    const mail = {
      email: email,
      subject,
      html,
    };
    sendEmail(mail);

    // save the rider
    const savedRider = await rider.save();

    // return a response
    res.status(201).json({
      message: `Check your email: ${savedRider.email} to verify your account.`,
      data: savedRider
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

    // verify the token and extract the user's email
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const rider = await RiderModel.findOne({ email: email.toLowerCase() });

    if (!rider) {
      return res.status(404).json({
        error: "Rider not found"
      });
    }

    // Check if rider has already been verified
    if (rider.isVerified) {
      return res.status(400).json({
        error: "User already verified"
      });
    }

    // update the rider verification and save changes to database
    rider.isVerified = true;
    await rider.save();

    res.status(200).json({
      message: "Rider verified successfully",
      data: rider,
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
    // get rider email from request body
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        error: "Please enter email address"
      });
    }

    // find rider
    const rider = await RiderModel.findOne({ email: email.toLowerCase() });
    if (!rider) {
      return res.status(404).json({
        error: "Rider not found"
      });
    }

    // Check if rider has already been verified
    if (rider.isVerified) {
      return res.status(400).json({
        error: "Rider already verified"
      });
    }

    // create a token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30 mins" });

    const subject = "Email Verification";
    const link = `https://Asap-app.onrender.com/#/verification/${token}`;
    const html = await mailTemplate(link, rider.riderFirstName + + riderlastName);
    const mail = {
      email: email,
      subject,
      html,
    };
    sendEmail(mail);

    res.status(200).json({
      message: `Verification email sent successfully to your email: ${rider.email}`
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
        error: "Please enter a valid email address"
      });
    }

    // Check if the email exists in the riderModel
    const rider = await RiderModel.findOne({ email: email.toLowerCase() });
    if (!rider) {
      return res.status(404).json({
        message: `Rider with the email ${email} not found`
      });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ riderId: rider._id }, process.env.JWT_SECRET, { expiresIn: "5m" });

    const subject = "Password Reset";
    const link = `https://Asap-app.onrender.com/#/resetpassword/${resetToken}`;
    const html = await forgotMailTemplate(link, rider.riderFirstName);
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
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(404).json({
        error: "Please enter a new password"
      });
    }

    // Verify the rider's token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the rider's ID from the token
    const riderId = decodedToken.riderId;

    // Find the rider by ID
    const rider = await RiderModel.findById(riderId);
    if (!rider) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Salt and hash the new password
    const saltedRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltedRound);

    // Update the user's password
    rider.password = hashedPassword;
    await rider.save();

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


// Rider login
exports.riderLogin = async (req, res) => {
  try {
    // Extract the rider's email and password
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        error: "Please enter all fields"
      });
    }

    // Find rider by their registered email
    const rider = await RiderModel.findOne({ email: email.toLowerCase() })

    // Check if the rider exists
    if (!rider) {
      return res.status(404).json({
        Failed: `Rider with the email ${email} not found`
      })
    }

    // Compare rider's password with the saved password.
    const checkPassword = bcrypt.compareSync(password, rider.password)
    // Check for password error
    if (!checkPassword) {
      return res.status(404).json({
        Message: 'Login Unsuccessful',
        Failed: 'Invalid password'
      })
    }

    // Check if the rider if verified
    if (!rider.isVerified) {
      return res.status(404).json({
        message: `Email Not Verified, Please verify your email to log in.`
      })
    }

    const token = jwt.sign({
      riderId: rider._id,
      email: rider.email,
      isAdmin: rider.isAdmin,
    //   isSuperAdmin: user.isSuperAdmin
    },
      process.env.JWT_SECRET, { expiresIn: "5 min" })

    rider.save()

    res.status(200).json({
      message: 'Login successful',
      riderFirstName: rider.riderFirstName,
      email: rider.email,
      token
    })

  } catch (error) {
    res.status(500).json({
      Error: error.message
    })
  }
}

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, existingPassword } = req.body;
    if (!newPassword || !existingPassword) {
      return res.status(404).json({
        error: "Please enter all fields"
      });
    }

    // Verify the rider's token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the rider's Id from the token
    const riderId = decodedToken.userId;

    // Find the rider by ID
    const rider = await RiderModel.findById(riderId);
    if (!rider) {
      return res.status(404).json({
        message: "Rider not found"
      });
    }

    // Confirm the previous password
    const isPasswordMatch = await bcrypt.compare(existingPassword, rider.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Existing password is incorrect."
      });
    }

    // Salt and hash the new password
    const saltedRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltedRound);

    // Update the rider's password
    rider.password = hashedPassword;
    await rider.save();

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


// Rider sign out
exports.signOut = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({
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
      message: 'Rider logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      Error: error.message
    });
  }
};

// Update Rider
exports.updateRider = async (req, res) => {
  try {
    const { riderId } = req.rider;
    // let fullName = riderFirstName + + riderLastName
    const { riderFirstName, riderLastName, email, phoneNumber } = req.body;

    const rider = await RiderModel.findById(riderId)

    if (!rider) {
      return res.status(200).json({
        message: `Rider with id: ${riderId} not found`,
      })
    }

    // Construct the data object based on the fields present in the request body
    const data = {};

    if (riderFirstName) {
      data.riderFirstName = riderFirstName.toUpperCase();
    }

    if (riderLastName) {
        data.riderLastName = riderLastName.toUpperCase();
      }

    if (phoneNumber) {
      data.phoneNumber = phoneNumber;
    }

    if (email) {
      data.email = email.toLowerCase();
      const emailExists = await userModel.findOne({ email: email.toLowerCase() })
  
      if (emailExists && emailExists._id.toString() !== riderId) {
        return res.status(400).json({
          message: `Email already exists.`
        })
      }
    }
    
    const update = await RiderModel.findByIdAndUpdate(riderId, data,
     { new: true })

    res.status(200).json({
      message: 'Rider updated successfully',
      data: update
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      Error: error.message
    })
  }
}



// Delete rider
exports.deleteRider = async (req, res) => {
  try {
    const riderId = req.rider.riderId
    const rider = await riderModel.findById(riderId);
    if (!rider) {
      return res.status(200).json({
        message: `Rider with id: ${riderId} not found`,
      })
    }
    const deletedUser = await RiderModel.findByIdAndDelete(riderId)
    res.status(200).json({
      message: 'Rider deleted successfully',
      deletedUser
    })

  } catch (error) {
    res.status(500).json({
      Error: error.message
    })
  }
};

exports.search = async (req, res) => {
  try {
    const { query } = req.query; // Get search query from request query parameters

    // Search restaurants
    // const restaurants = await restaurant.find({ name: { $regex: new RegExp(query, 'i') } });

    // // Search menu items
    // const menuItems = await MenuItem.find({ name: { $regex: new RegExp(query, 'i') } });

    res.json({ restaurants, menuItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};