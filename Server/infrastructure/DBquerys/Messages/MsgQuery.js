const Doctor=require("../../../entities/Doctor/Doctormodel")
const Booking=require("../../../entities/Booking/Bookingmodel")
const User=require("../../../entities/User/usermodel")


const getDoctorsForUser = async (userId) => {
    try {
      const bookings = await Booking.find({userId : userId,status: { $ne: 'Cancelled' }});
      const doctorIds = bookings.map(booking => booking.doctorId);
      const doctors = await Doctor.find({ _id: { $in: doctorIds } });
      return doctors;
    } catch (error) {
      console.error('Error fetching doctors for user:', error);
      throw new Error('Failed to fetch doctors for user');
    }
  };
  const getUsersForDoctor = async (doctorId) => {
    try {
      const bookings = await Booking.find({ doctorId:doctorId,status: { $ne: 'Cancelled' }});
      const userIds = bookings.map(booking => booking.userId);
      const users = await User.find({ _id: { $in: userIds } });
      return users;
    } catch (error) {
      console.error('Error fetching users for doctor:', error);
      throw new Error('Failed to fetch users for doctor');
    }
  };




module.exports={
getDoctorsForUser,
getUsersForDoctor
}