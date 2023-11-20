const { decodeToken } = require("../Utili/jwt");
// auth middleware
const resturrantAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const hasAuthorization = req.headers.authorization;
      const token = hasAuthorization.split(" ")[1];
      const user = await decodeToken(token);
      req.user = user;
      if (req.user?.isloggedin) {
        next();
      } else {
        res.status(401).json({
          message: "please login",
        });
      }
    } else {
      res.status(404).json({
        message: "No authorization found, please login",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "not an admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isRole = async (req, res, next) => {
  try {
    if (req.user.role==="admin") {
      next();
    } else {
      res.status(401).json({ message: " not an admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { resturrantAuth, isAdmin, isRole };
