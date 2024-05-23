const users = require("../../entities/User/usermodel");
const Doctor = require("../../entities/Doctor/Doctormodel");
const usersFetch = async (req, res) => {
  try {
    const fetchedata = await users.find({ role: { $ne: "ADMIN" } });
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
    const fetchedata = await Doctor.find({
      is_verified: false,
      is_registered: true,
    });
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
    const fetchedata = await Doctor.find({ is_verified: true });
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
    const user = await users.findById(userid);
    if (!user) {
      console.log("no user");
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_banned) {
      user.is_banned = false;
      await user.save();
      return res.status(200).json({ message: "User unbanned successfully" });
    } else {
      user.is_banned = true;
      await user.save();
      return res.status(200).json({ message: "User banned successfully" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const verifyDoctor = async (req, res) => {
  try {
    const doctorid = req.params.doctorid;
    console.log(doctorid, "===>");
    const doctor = await Doctor.findOne({ _id: doctorid });
    console.log(doctor, "==>doctor");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    doctor.is_verified = true;
    await doctor.save();
    return res.status(200).json({ message: "successfully verified." });
  } catch (error) {
    console.log(error.message);
  }
};

const banDoctor= async (req, res) => {
  try {
    const doctorid = req.params.id;
    const doctor = await Doctor.findById(doctorid);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (doctor.is_banned) {
      doctor.is_banned = false;
      await doctor.save();
      return res.status(200).json({ message: "Doctor unbanned successfully" });
    } else {
      doctor.is_banned = true;
      await doctor.save();
      return res.status(200).json({ message: "Doctor banned successfully" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  usersFetch,
  approvals,
  doctorlist,
  userBan,
  verifyDoctor,
  banDoctor
};
