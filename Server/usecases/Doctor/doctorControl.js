const jwt = require("jsonwebtoken");
const DocQuery = require("../../infrastructure/DBquerys/Doctor/DocQuery");
const BookingQuery = require("../../infrastructure/DBquerys/Users/usersCrud");
const { comparedata } = require("../../util/Bcrypthash");
const { sendOTP } = require("../Users/otpControl");
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const logger = require("../../util/Logger")
const Doctor_signup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingEmail = await DocQuery.docfindbyEmail(email);
    if (existingEmail) {
      if (existingEmail.is_verified) {
        return res.status(400).json({ message: "Doctor with this email already exists" });
      } else if (!existingEmail.is_registered) {
        await sendOTP(email);
        return res.status(200).json({ message: "OTP sent" });
      } else {
        return res.status(400).json({ message: "You are on Admin verification Process!." });
      }
    }
    const existingLicenseNo = await DocQuery.docfindbyLicense(req.body.medical_license_no);
    if (existingLicenseNo) {
      return res.status(400).json({ message: "Doctor with this medical license number already exists" });
    }
    const doctorData = req.body;
    await DocQuery.Doctorsave(doctorData);
    await sendOTP(email);
    logger.info(`Doctor signup OTP sent to ${email}`);
    return res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    logger.error("Error in Doctor_signup: " + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const Doctor_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctorExist = await DocQuery.docfindbyEmail(email);
    if (!doctorExist) {
      res.status(404).json({ message: " Not found please Register!" });
      return;
    } else if (doctorExist.is_Deleted) {
      res.status(403).json({ message: " Internal server issue!" });
      return;
    } else if (doctorExist.is_banned) {
      res.status(403).json({ message: " UnAuthorized!" });
      return;
    } else if (!doctorExist.is_registered) {
      res.status(403).json({ message: " Not registered Yet!" });
    } else {
      const isMatch = await comparedata(password, doctorExist.password);
      if (!isMatch) {
        res.status(401).json({ message: "Wrong password" });
        return;
      } else {
        const token = jwt.sign(
          { doctor: doctorExist._id },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        logger.info(`Doctor ${email} logged in successfully`);
        res.cookie('doctortoken', token, {httpOnly: true, sameSite:"none",secure:true })
        res.status(200).json({ message: "successfully Logined.." });
      }
    }
  } catch (error) {
    logger.error("Error in Doctor_login: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const fetch_doctor = async (req, res) => {
  try {
    const token = req.cookies.doctortoken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await DocQuery.docfindbyId(verified.doctor);
    if (!data) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    logger.info(`Doctor data fetched for ID ${verified.doctor}`);
    res.status(200).json({ data });
  } catch (error) {
    logger.error("Error in fetch_doctor: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const edit_profile = async (req, res) => {
  try {
    const token = req.cookies.doctortoken;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await DocQuery.docfindbyId(verified.doctor);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    let updateData = { name: req.body.name, phone_number: req.body.phone_number, dob: req.body.dob };
    if (req.file) {
      const imageUrl = doctor.profile;
      if (imageUrl) {
        const parsedUrl = new URL(imageUrl);
        const imageName = path.basename(parsedUrl.pathname);
        const imagePath = path.join(__dirname, '../../public', imageName);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      const path_image = process.env.HOST+ `profileimages/${req.file.filename}`;
      updateData.profile = path_image;
    }
    await DocQuery.profileUpdate(verified.doctor, updateData);
    logger.info(`Doctor profile updated for ID ${verified.doctor}`);
    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    logger.error("Error in edit_profile: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const delete_propic = async (req, res) => {
  try {
    const token = req.cookies.doctortoken;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await DocQuery.docfindbyId(verified.doctor);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const imageUrl = doctor.profile;
    if (imageUrl) {
      const parsedUrl = new URL(imageUrl);
      const imageName = path.basename(parsedUrl.pathname);
      const imagePath = path.join(__dirname, '../../public', imageName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await DocQuery.deletepro(verified.doctor, { profile: "" });
    logger.info(`Profile picture deleted for doctor ID ${verified.doctor}`);
    return res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    logger.error("Error in delete_propic: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const your_bookings = async (req, res) => {
  try {
    const { date, doctorId } = req.params;
    if (!date || !doctorId) {
      return res.status(400).json({ message: 'Date and doctorId are required' });
    }
    const { appointments, Slots } = await DocQuery.yourbookings(date, doctorId);
    logger.info(`Fetched bookings for doctor ID ${doctorId} on ${date}`);
    res.status(200).json({ appointments, Slots });
  } catch (error) {
    logger.error("Error in your_bookings: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const cancel_booking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    await DocQuery.cancelbooking(bookingId);
    logger.info(`Booking canceled for ID ${bookingId}`);
    return res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    logger.error("Error in cancel_booking: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const slot_update = async (req, res) => {
  try {
    const { doctorId, date, slots } = req.body;
    await DocQuery.slotUpdate(doctorId, date, slots);
    logger.info(`Slots updated for doctor ID ${doctorId} on ${date}`);
    return res.status(200).json({ message: 'Slot locked successfully' });
  } catch (error) {
    logger.error("Error in slot_update: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const update_booking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const Booking = await BookingQuery.Bookingfindbyid(bookingId);
    if (Booking) {
      Booking.status = "Completed";
      await BookingQuery.saveBooking(Booking);
      logger.info(`Booking status updated to completed for booking ID ${bookingId}`);
      return res.status(200).json({ message: "Booking updated successfully" });
    }
  } catch (error) {
    logger.error("Error in update_booking: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const fetch_doc = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await DocQuery.fetch_dash(doctorId);
    logger.info(`Fetched dashboard appointments for doctor ID ${doctorId}`);
    res.status(200).json(appointments);
  } catch (error) {
    logger.error("Error in fetch_doc: " + error.message);
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};
const Doctor_logout=async(req,res)=>{
  try {
    res.clearCookie('doctortoken', { httpOnly: true, sameSite:"none",secure:true });
    res.status(200).json({message:"susccessfully logout"})
  } catch (err) {
    logger.error(`Error in looutcontroller: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
}
module.exports = {
  Doctor_signup,
  Doctor_login,
  fetch_doctor,
  edit_profile,
  delete_propic,
  your_bookings,
  cancel_booking,
  slot_update,
  update_booking,
  fetch_doc,
  Doctor_logout
};
