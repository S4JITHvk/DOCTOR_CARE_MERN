const Doctor = require("../../../entities/Doctor/Doctormodel");
const Booking = require("../../../entities/Booking/Bookingmodel");
const User = require("../../../entities/User/usermodel");
const getDoctorsForUser = async (userId) => {
  try {
    const bookings = await Booking.find({
      userId: userId,
      status: { $ne: "Cancelled" },
    });
    const doctorIds = bookings.map((booking) => booking.doctorId);
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).sort({
      _id: -1,
    });
    return doctors;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUsersForDoctor = async (doctorId) => {
  try {
    const bookings = await Booking.find({
      doctorId: doctorId,
      status: { $ne: "Cancelled" },
    });
    const userIds = bookings.map((booking) => booking.userId);
    const users = await User.find({ _id: { $in: userIds } }).sort({ _id: -1 });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  getDoctorsForUser,
  getUsersForDoctor,
};
