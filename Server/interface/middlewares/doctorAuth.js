const jwt = require("jsonwebtoken");
const doctor = require("../../entities/Doctor/Doctormodel");
const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.doctortoken;
    if (token) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const data = await doctor.findById(verified.doctor);
      if (data) {
        if (data.role === "DOCTOR") {
          next();
        } else {
          res.status(404).json({ message: "UnAuthorized!" });
        }
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = Auth;
