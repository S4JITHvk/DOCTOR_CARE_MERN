const AdminQuery = require("../../infrastructure/DBquerys/Admin/AdminQuery");
const UserQuery = require("../../infrastructure/DBquerys/Users/usersCrud");
const DocQuery = require("../../infrastructure/DBquerys/Doctor/DocQuery");
const stripeSecretKey = process.env.STRIPE_SECRETKEY;
const stripe = require('stripe')(stripeSecretKey);
require('dotenv').config();
const logger = require("../../util/Logger")
const usersFetch = async (req, res) => {
  try {
    const fetchedData = await AdminQuery.UserList();
    if (fetchedData) {
      logger.info('Fetched user list');
      return res.status(200).json({ data: fetchedData });
    } else {
      logger.warn('No users found');
      return res.status(400).json({ message: 'No users found' });
    }
  } catch (e) {
    logger.error('Error fetching user list: ' + e.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const approvals = async (req, res) => {
  try {
    const fetchedData = await AdminQuery.Approvals();
    if (fetchedData) {
      logger.info('Fetched approvals list');
      return res.status(200).json({ data: fetchedData });
    } else {
      logger.warn('No approvals found');
      return res.status(400).json({ message: 'No approvals found' });
    }
  } catch (err) {
    logger.error('Error fetching approvals: ' + err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const doctorlist = async (req, res) => {
  try {
    const fetchedData = await AdminQuery.DoctorList();
    if (fetchedData) {
      logger.info('Fetched doctor list');
      return res.status(200).json({ data: fetchedData });
    } else {
      logger.warn('No doctors found');
      return res.status(400).json({ message: 'No doctors found' });
    }
  } catch (err) {
    logger.error('Error fetching doctor list: ' + err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const userBan = async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await UserQuery.findbyid(userid);
    if (!user) {
      logger.warn('User not found: ' + userid);
      return res.status(404).json({ message: "User not found" });
    }
    user.is_banned = !user.is_banned;
    await UserQuery.saveUser(user);
    logger.info(`User ${userid} ${user.is_banned ? 'banned' : 'unbanned'} successfully`);
    return res.status(200).json({ message: user.is_banned ? "User banned successfully" : "User unbanned successfully" })
  } catch (err) {
    logger.error('Error banning/unbanning user: ' + err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const userDelete = async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await UserQuery.findbyid(userid);
    if (!user) {
      logger.warn('User not found: ' + userid);
      return res.status(404).json({ message: "User not found" });
    }
    user.is_Deleted = true;
    await UserQuery.saveUser(user);
    logger.info(`User ${userid} deleted successfully`);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    logger.error('Error deleting user: ' + err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const verifyDoctor = async (req, res) => {
  try {
    const doctorid = req.params.doctorid;
    const doctor = await DocQuery.docfindbyId(doctorid);
    if (!doctor) {
      logger.warn('Doctor not found: ' + doctorid);
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.is_verified = true;
    await DocQuery.Docupdate(doctor);
    logger.info(`Doctor ${doctorid} verified successfully`);
    return res.status(200).json({ message: "Successfully verified." });
  } catch (error) {
    logger.error('Error verifying doctor: ' + error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const banDoctor = async (req, res) => {
  try {
    const doctorid = req.params.id;
    const doctor = await DocQuery.docfindbyId(doctorid);
    if (!doctor) {
      logger.warn('Doctor not found: ' + doctorid);
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.is_banned = !doctor.is_banned;
    await DocQuery.Docupdate(doctor);
    await DocQuery.ban_cancel_booking(doctor._id);
    logger.info(`Doctor ${doctorid} ${doctor.is_banned ? 'banned' : 'unbanned'} successfully`);
    return res.status(200).json({ message: doctor.is_banned ? "Doctor banned successfully" : "Doctor unbanned successfully" });
  } catch (err) {
    logger.error('Error banning/unbanning doctor: ' + err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const deleteDoctor = async (req, res) => {
  try {
    const doctorid = req.params.id;
    const doctor = await DocQuery.docfindbyId(doctorid);
    if (!doctor) {
      logger.warn('Doctor not found: ' + doctorid);
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.is_Deleted = true;
    await DocQuery.Docupdate(doctor);
    await DocQuery.ban_cancel_booking(doctor._id);
    logger.info(`Doctor ${doctorid} deleted successfully`);
    return res.status(200).json({ message: "Doctor deleted successfully!" });
  } catch (err) {
    logger.error('Error deleting doctor: ' + err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const bookingList = async (req, res) => {
  try {
    const { page = 1, date, doctorName } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;
    const match = {};
    if (date) {
      match.date = new Date(date);
    }
    if (doctorName) {
      match['doctorId.name'] = { $regex: doctorName, $options: 'i' };
    }
    const { bookings, totalPages } = await AdminQuery.Booking_list(match, skip, limit);
    logger.info('Fetched booking list');
    res.status(200).json({ bookings, totalPages });
  } catch (error) {
    logger.error('Error fetching booking list: ' + error.message);
    return res.status(500).json({ message: 'Error fetching bookings' });
  }
};
const allbookingList = async (req, res) => {
  try {
    const { bookings } = await AdminQuery.Booking_alllist();
    logger.info('Fetched all bookings list');
    res.status(200).json({ bookings });
  } catch (error) {
    logger.error('Error fetching all bookings: ' + error.message);
    return res.status(500).json({ message: 'Error fetching bookings' });
  }
};
const cancelledBooking = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { cancelledBookings, totalPages } = await AdminQuery.cancelled_booking(skip, limit);
    logger.info('Fetched cancelled bookings list');
    res.status(200).json({ cancelledBookings, totalPages });
  } catch (e) {
    logger.error('Error fetching cancelled bookings: ' + e.message);
    return res.status(500).send('Server Error');
  }
};
const refundBooking = async (req, res) => {
  try {
    const bookingid = req.body.bookingId;
    const data = await UserQuery.Bookingfindbyid(bookingid);
    const chargeId = data.payment.chargeId;
    const amount = data.payment.amount;
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: amount,
    });
    data.payment.status = "Refunded";
    await UserQuery.saveBooking(data);
    logger.info(`Booking ${bookingid} refunded successfully`);
    res.status(200).json({ message: "Successfully refunded" });
  } catch (e) {
    logger.error('Error processing refund: ' + e.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  usersFetch,
  approvals,
  doctorlist,
  userBan,
  verifyDoctor,
  banDoctor,
  bookingList,
  cancelledBooking,
  userDelete,
  deleteDoctor,
  refundBooking,
  allbookingList
};
