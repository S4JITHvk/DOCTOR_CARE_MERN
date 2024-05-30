const User = require("../../../entities/User/usermodel");
const Doctor=require("../../../entities/Doctor/Doctormodel")
const Booking=require("../../../entities/Booking/Bookingmodel")
const findbyid = async (id) => {
  try {
    const data = await User.findOne({_id:id});
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const findbyEmail = async (email) => {
  try {
    const data = await User.findOne({ email: email });
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};
const createUser = async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
    } catch (e) {
      console.error(e.message);
    }
  };
  const Updatepassword = async (email, hashedpass) => {
    try {
        await User.updateOne({ email: email }, { password: hashedpass });
    } catch (e) {
      console.error(e.message);
    }
  };
  const profileUpdate=async (id,data)=>{
    try{
     await User.updateOne({ _id: id }, { $set: data})
    }catch(err){
      console.log(err.message)
    }
  }
  const deletepro=async(id,data)=>{
    try{
  await User.updateOne({_id:id},{$unset:data})
    }catch(e){
      console.log(e.message)
    }
  }
  const saveUser = async (user) => {
    try {
      await user.save();
    } catch (err) {
      throw new Error('Error saving user');
    }
  };
  const get_doctorslist = async (query,page, limit) => {
    try {
      const doctors = await Doctor.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await Doctor.countDocuments(query);
      return { doctors, totalPages: Math.ceil(count / limit), currentPage: page };
    } catch (err) {
      throw new Error("Error getting list.");
    }
};
const get_bookinglistQuery = async (id) => {
  try {
    const currentDate = new Date();
    const data = await Booking.find({ doctorId: id, date: { $gte: currentDate } });
    return data;
  } catch (err) {
    throw new Error("Error getting list.");
  }
};
const check_shift = async (docId,userId, date, shift) => {
  try {
    const result = await Booking.find({ doctorId: docId, date: date, shift: shift });
    if (result.length === 0) {
      const tempBooking ={
        doctorId: docId,
        userId:userId,
        date: date,
        shift: shift
      }
      await new Booking(tempBooking).save();
      return false; 
    } else {
      return true; 
    }
  } catch (e) {
    throw new Error("Error checking or creating booking: " + e.message);
  }
};

const placeBooking = async (data) => {
  try {
    await new Booking(data).save();
  } catch (err) {
    throw new Error("Error placing booking.");
  }
};
  
module.exports = {
  findbyid,
  findbyEmail,
  createUser,
  Updatepassword,
  profileUpdate,
  deletepro,
  saveUser,
  get_doctorslist,
  get_bookinglistQuery,
  placeBooking,
  check_shift
};
