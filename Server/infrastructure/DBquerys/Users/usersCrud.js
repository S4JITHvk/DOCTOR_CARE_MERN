const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const User = require("../../../entities/User/usermodel");
const Doctor=require("../../../entities/Doctor/Doctormodel")
const Booking=require("../../../entities/Booking/Bookingmodel")
const Slot=require("../../../entities/Doctor/Slotmodel")
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
    const List = await Booking.find({ doctorId: id, date: { $gte: currentDate } });
    const Slots=await Slot.find({doctorId:id, date: { $gte: currentDate }})
    return {List,Slots};
  } catch (err) {
    throw new Error("Error getting list.");
  }
};


const placeBooking = async (data) => {
  try {
    await new Booking(data).save();
  } catch (err) {
    throw new Error("Error placing booking.");
  }
};
const yourappointments = async (userId) => {
  try {
    const appointments = await Booking.aggregate([
      {
        $match: { userId: new ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'doctors', 
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctorInfo'
        }
      },
      {
        $unwind: '$doctorInfo' 
      },
      {
        $project: {
          _id: 1,
          date: 1,
          shift: 1,
          status: 1,
          payment:1,
          'doctorName': '$doctorInfo.name',
          'expertise': '$doctorInfo.expertise',
          'experience': '$doctorInfo.experience_years',
          'gender': '$doctorInfo.gender'
        }
      },
      {
        $sort: { date: -1 } 
      }
    ]);
    return appointments;
  } catch (err) {
    console.log(err.message)
  }
};
const Bookingfindbyid=async(id)=>{
  try{
    const data=await Booking.findById(id)
      return data
  }catch(e){
    console.log(e.message)
  }
}
const saveBooking = async (booking) => {
  try {
    await booking.save();
  } catch (err) {
    throw new Error('Error saving user');
  }
};
const add_favoritedoctor = async (doctorId, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const doctorIndex = user.favoriteDoctors.indexOf(doctorId);
    let message;

    if (doctorIndex !== -1) {
      user.favoriteDoctors.splice(doctorIndex, 1);
      message = 'Doctor removed from favorites';
    } else {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      user.favoriteDoctors.push(doctorId);
      message = 'Doctor added to favorites';
    }

    await user.save();
    return { message };
  } catch (err) {
    throw new Error('Error adding favorite doctor user');
  }
};

const fetch_favoritedoctor=async(userId)=>{
  try{
    const user = await User.findById(userId).populate('favoriteDoctors').exec();
    const favoriteDoctors = user.favoriteDoctors;
    console.log(favoriteDoctors,"doctor")
    return favoriteDoctors;
  } catch (err) {
    throw new Error('Error adding fetch fav doctor user');
  }
}
  
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
  yourappointments,
  Bookingfindbyid,
  saveBooking,
  add_favoritedoctor,
  fetch_favoritedoctor
};
