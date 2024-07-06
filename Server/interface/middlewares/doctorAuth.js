const jwt = require("jsonwebtoken");
const doctor = require("../../entities/Doctor/Doctormodel");
require('dotenv').config();
const logger = require("../../util/Logger")
const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.doctortoken;
    if (token) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const data = await doctor.findById(verified.doctor);
      if (data) {
        if (data.role === "DOCTOR") {
          logger.info(`Doctor ${data._id} authorized`);
          next();
        } else {
          logger.warn(`Doctor ${data._id} unauthorized access attempt`);
          res.status(404).json({ message: "Unauthorized!" });
        }
      } else {
        logger.warn('Doctor not found for the given token');
        res.status(404).json({ message: "Doctor not found" });
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
