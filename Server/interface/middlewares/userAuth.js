const jwt = require("jsonwebtoken");
const User = require("../../entities/User/usermodel");
require('dotenv').config();
const logger = require("../../util/Logger")
const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const data = await User.findById(verified.user);
      if (data) {
        if (data.role === "USER") {
          req.userID = data._id;
          logger.info(`User ${data._id} authorized`);
          next();
        } else {
          logger.warn(`User ${data._id} unauthorized access attempt`);
          res.status(404).json({ message: "Unauthorized!" });
        }
      } else {
        logger.warn('User not found for the given token');
        res.status(404).json({ message: "User not found" });
      }
    } else {
      logger.warn('No token found in cookies');
      res.status(401).json({ message: "No token provided" });
    }
  } catch (e) {
    logger.error('Error in authentication middleware: ' + e.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = Auth;
