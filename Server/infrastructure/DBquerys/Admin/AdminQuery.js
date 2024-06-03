const User=require("../../../entities/User/usermodel")
const Doctor=require("../../../entities/Doctor/Doctormodel")
const Booking=require("../../../entities/Booking/Bookingmodel")

const UserList=async()=>{
    try{
        const fetchedata = await User.find({ role: { $ne: "ADMIN" } });
        return fetchedata
    }catch(e){
    console.log(e.message)
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
        const fetchedata = await Doctor.find({ is_verified: true });
        return fetchedata
    }catch(e){
        console.log(e.message)
    }
}
const Booking_list=async(query,skip,limit)=>{
    try{
        const bookings = await Booking.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ date: 1 })
        .populate('doctorId')
        .populate('userId');
        console.log(bookings,"==>")
      const totalBookings = await Booking.countDocuments(query);
      const totalPages = Math.ceil(totalBookings / limit);

      return {bookings,totalPages}
    }catch(e){
        console.log(e.message)
    }
}


module.exports={
    UserList,
    Approvals,
    DoctorList,
    Booking_list
}