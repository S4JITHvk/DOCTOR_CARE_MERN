const User=require("../../../entities/User/usermodel")
const Doctor=require("../../../entities/Doctor/Doctormodel")
const Booking=require("../../../entities/Booking/Bookingmodel")

const UserList = async () => {
  try {
      const fetchedData = await User.find({ 
          role: { $ne: "ADMIN" },
          is_Deleted: false,
          is_verified: true
      });
      return fetchedData;
  } catch (e) {
      console.log(e.message);
  }
}


const Approvals=async()=>{
    try{
        const fetchedata = await Doctor.find({
            is_verified: false,
            is_registered: true,
          });
          return fetchedata
    }catch(e){
        console.log(e.message)
    }
}
const DoctorList=async()=>{
    try{
        const fetchedata = await Doctor.find({ is_verified: true,is_Deleted:false });
        return fetchedata
    }catch(e){
        console.log(e.message)
    }
}
const Booking_list = async (match, skip, limit) => {
  try {
    const filteredMatch = { ...match, status: { $ne: 'Cancelled' } };
    
    const bookings = await Booking.aggregate([
      { $match: filteredMatch },
      { $sort: { date: 1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctorDetails'
        }
      },
      { $unwind: '$doctorDetails' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }
    ]);

    const totalBookings = await Booking.countDocuments(filteredMatch);
    const totalPages = Math.ceil(totalBookings / limit);
    const populatedBookings = bookings.map(booking => {
      booking.doctorId = booking.doctorDetails;
      booking.userId = booking.userDetails;
      delete booking.doctorDetails;
      delete booking.userDetails;
      return booking;
    });

    return {
      bookings: populatedBookings,
      totalBookings,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
const cancelled_booking = async (skip, limit) => {
  try {
    const cancelledBookings = await Booking.aggregate([
      { $match: { status: 'Cancelled' } },
      { $sort: { date: 1 } },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctorDetails'
        }
      },
      { $unwind: '$doctorDetails' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }
    ]);

    const totalBookings = await Booking.countDocuments({ status: 'Cancelled' });
    const totalPages = Math.ceil(totalBookings / limit);

    return { cancelledBookings, totalPages };
  } catch (error) {
    console.error('Error fetching cancelled bookings:', error);
    throw new Error('Server Error');
  }
};



module.exports={
    UserList,
    Approvals,
    DoctorList,
    Booking_list,
    cancelled_booking
}