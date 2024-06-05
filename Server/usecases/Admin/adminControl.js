
const AdminQuery=require("../../infrastructure/DBquerys/Admin/AdminQuery")
const UserQuery=require("../../infrastructure/DBquerys/Users/usersCrud")
const DocQuery=require("../../infrastructure/DBquerys/Doctor/DocQuery")
const stripeSecretKey = process.env.STRIPE_SECRETKEY;
const stripe = require('stripe')(stripeSecretKey);
const usersFetch = async (req, res) => {
  try {
    const fetchedata = await AdminQuery.UserList()
    if (fetchedata) {
      return res.status(200).json({ data: fetchedata });
    } else {
      return res.status(400);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const approvals = async (req, res) => {
  try {
    const fetchedata = await AdminQuery.Approvals()
    if (fetchedata) {
      return res.status(200).json({ data: fetchedata });
    } else {
      return res.status(400);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const doctorlist = async (req, res) => {
  try {
    const fetchedata = await AdminQuery.DoctorList()
    if (fetchedata) {
      return res.status(200).json({ data: fetchedata });
    } else {
      return res.status(400);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const userBan = async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await UserQuery.findbyid(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.is_banned = !user.is_banned;
    await UserQuery.saveUser(user);
    return res.status(200).json({ message: user.is_banned ? "User banned successfully" : "User unbanned successfully" });
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const userDelete=async(req,res)=>{
  try{
    const userid = req.params.userid;
    const user = await UserQuery.findbyid(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.is_Deleted =true;
    await UserQuery.saveUser(user);
    return res.status(200).json({ message: "User deleted Successfully"});
  }catch(e){
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
const verifyDoctor = async (req, res) => {
  try {
    const doctorid = req.params.doctorid;
    const doctor = await DocQuery.docfindbyId( doctorid );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.is_verified = true;
    await DocQuery.Docupdate(doctor);
    return res.status(200).json({ message: "successfully verified." });
  } catch (error) {
    console.log(error.message);
  }
};

const banDoctor= async (req, res) => {
  try {
    const doctorid = req.params.id;
    const doctor = await DocQuery.docfindbyId(doctorid);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.is_banned = !doctor.is_banned;
    await DocQuery.Docupdate(doctor);
    await DocQuery.ban_cancel_booking( doctor._id)
    return res.status(200).json({ message: doctor.is_banned ? "Doctor banned successfully" : "Doctor unbanned successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
const deleteDoctor=async (req, res) => {
  try {
    const doctorid = req.params.id;
    const doctor = await DocQuery.docfindbyId(doctorid);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.is_Deleted= true;
    await DocQuery.Docupdate(doctor);
    await DocQuery.ban_cancel_booking( doctor._id)
    return res.status(200).json({ message: "Doctor deleted Successfully!"});
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
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
    res.json({ bookings, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};
const cancelledBooking = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { cancelledBookings, totalPages }= await AdminQuery.cancelled_booking(skip, limit);
    res.json({ cancelledBookings, totalPages });
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
};
const refundBooking=async(req,res)=>{
  try{
    const bookingid=req.body.bookingId 
    const data=await UserQuery.Bookingfindbyid(bookingid)
    const chargeId=data.payment.chargeId
    const amount=data.payment.amount
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: amount,
    });
    data.payment.status="Refunded"
    await UserQuery.saveBooking(data)
    res.status(200).json({message:"successfully refunded"})
  }catch(e){
    console.log(e.message)
  }
}
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
  refundBooking
};
