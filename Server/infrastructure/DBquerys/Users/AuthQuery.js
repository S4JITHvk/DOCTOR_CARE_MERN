const User = require("../../../entities/User/usermodel");
const Otp = require("../../../entities/User/otpmodel");
const Doctor = require("../../../entities/Doctor/Doctormodel");
const deleteotp = async (email) => {
  try {
    await Otp.deleteOne({ email });
  } catch (e) {
    throw new Error(e.message);
  }
};
const OtpSave = async (data) => {
  try {
    const OTP = new Otp(data);
    await OTP.save();
  } catch (e) {
    throw new Error(e.message);
  }
};
const otpfindbyEmail = async (email) => {
  try {
    const data = await Otp.findOne({ email: email });
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(e.message);
  }
};
const Docupdate = async (email) => {
  try {
    await Doctor.updateOne({ email: email }, { is_registered: true });
  } catch (e) {
    throw new Error(e.message);
  }
};
const Userupdate = async (email) => {
  try {
    await User.updateOne({ email: email }, { is_verified: true });
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports = {
  deleteotp,
  OtpSave,
  otpfindbyEmail,
  Docupdate,
  Userupdate,
};
