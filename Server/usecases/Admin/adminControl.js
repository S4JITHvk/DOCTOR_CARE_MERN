
const AdminQuery=require("../../infrastructure/DBquerys/Admin/AdminQuery")
const UserQuery=require("../../infrastructure/DBquerys/Users/usersCrud")
const DocQuery=require("../../infrastructure/DBquerys/Doctor/DocQuery")
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
    console.log("ban user");
    const userid = req.params.userid;
    console.log(userid, "userid==>");
    
    const user = await UserQuery.findbyid(userid);
    if (!user) {
      console.log("no user");
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
const bookingList=async (req, res) => {
  try {
    const { page = 1, date, doctorName } = req.query;
  const limit = 10; 
  const skip = (page - 1) * limit;

  const query = {};
  if (date) {
    query.date = new Date(date);
  }
  if (doctorName) {
    query['doctor.name'] = { $regex: doctorName, $options: 'i' }; 
  }
    const {bookings,totalPages}=await AdminQuery.Booking_list(query,skip,limit)
    res.json({ bookings, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
}

module.exports = {
  usersFetch,
  approvals,
  doctorlist,
  userBan,
  verifyDoctor,
  banDoctor,
  bookingList
};
