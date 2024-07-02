const Doctor=require("../../../entities/Doctor/Doctormodel")
const Booking=require("../../../entities/Booking/Bookingmodel")
const User=require("../../../entities/User/usermodel")
const Slot=require("../../../entities/Doctor/Slotmodel")
const docfindbyId=async(id)=>{
  try{
const data=await Doctor.findById(id)
if(data){
    return data
}else{
    return null
}
  }catch(e){
    console.log(e.message)
  }
}
const docfindbyEmail=async(email)=>{
    try{
  const data=await Doctor.findOne({email:email})
  if(data){
      return data
  }else{
      return null
  }
    }catch(e){
      console.log(e.message)
    }
  }
  const docfindbyLicense=async(no)=>{
    try{
  const data=await Doctor.findOne({medical_license_no:no})
  if(data){
      return data
  }else{
      return null
  }
    }catch(e){
      console.log(e.message)
    }
  }
  const DocUpdatepassword = async (email, hashedpass) => {
    try {
        await Doctor.updateOne({ email: email }, { password: hashedpass });
    } catch (e) {
      console.error(e.message);
    }
  };
const Doctorsave=async(data)=>{
    try{
    const newDoctor=new Doctor(data)
    await newDoctor.save()
    }catch(e){
        console.log(e.message)
    }
}
const Docupdate=async(doctor)=>{
    try{
    await doctor.save()
    }catch(e){
        console.log(e.message)
    }
}
const profileUpdate=async (id,data)=>{
  try{
   await Doctor.updateOne({ _id: id }, { $set: data})
  }catch(err){
    console.log(err.message)
  }
}
const deletepro=async(id,data)=>{
  try{
await Doctor.updateOne({_id:id},{$unset:data})
  }catch(e){
    console.log(e.message)
  }
}
const yourbookings = async (date, doctorId) => {
  try {
    const inputDate = new Date(date);
    const isoDateString = inputDate.toISOString().split('T')[0];
    const appointments = await Booking.find({ doctorId: doctorId, date: isoDateString })
      .populate('userId')
      .exec();
    const Slots=await Slot.find({doctorId:doctorId,date: isoDateString })
    return {appointments,Slots}
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}
const cancelbooking=async(id)=>{
  try{
   await Booking.findByIdAndUpdate({_id:id},{$set:{status:"Cancelled"}})
   return
  }catch(e){
    console.log(e.message)
  }
}
const ban_cancel_booking = async (docId) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0]; 
    const bookings = await Booking.find({
      doctorId: docId,
      date: { $gte: currentDate }, 
    });
    await Promise.all(
      bookings.map(async (booking) => {
        booking.status = "Cancelled";
        await booking.save();
      })
    );

  } catch (e) {
    console.log(e.message);
  }
};
const slotUpdate=async(doctorId,date,shifts)=>{
  try{
    const slot=new Slot({
      doctorId:doctorId,
      date:date,
      shifts:shifts
    })
    await slot.save()
  }catch(e){
    console.log(e.message)
  }

}
const fetch_dash = async (doctorId) => {
  try {
    const bookings = await Booking.find({ doctorId })
      .populate('userId', 'name email')
      .exec();

    return bookings;
  } catch (e) {
    console.log(e.message);
    throw e; 
  }
};

module.exports={
 docfindbyId,
 docfindbyEmail,
 DocUpdatepassword,
 docfindbyLicense,
 Doctorsave,
 Docupdate,
 profileUpdate,
 deletepro,
 yourbookings,
 cancelbooking,
 ban_cancel_booking,
 slotUpdate,
 fetch_dash
}