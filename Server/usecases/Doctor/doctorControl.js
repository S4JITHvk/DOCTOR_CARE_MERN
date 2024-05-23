const Doctor=require("../../entities/Doctor/Doctormodel")
const jwt = require("jsonwebtoken");
const {hashdata, comparedata}=require('../../util/Bcrypthash')
const {sendOTP}=require('../Users/otpControl')


const Doctor_signup=async(req,res)=>{
    try{
        console.log(req.body,"===>doctors registration")
        const {email}=req.body
        const existingEmail = await Doctor.findOne({email:email });
        if (existingEmail) {
            if(existingEmail.is_verified){
                return res.status(400).json({ message: 'Doctor with this email already exists' });
            }else if(!existingEmail.is_registered){
                await sendOTP(email)
                return res.status(200).json({ message: 'OTP sent' });
            }else{
                return res.status(400).json({message:"You are on Admin verification Process!."})
            }   
        }
        const existingLicenseNo = await Doctor.findOne({medical_license_no:req.body.medical_license_no });
        if (existingLicenseNo) {
            return res.status(400).json({ message: 'Doctor with this medical license number already exists' });
        }
        const doctorData = req.body;
        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();
        await sendOTP(email)
        return res.status(200).json({ message: 'OTP sent' });

    }catch(error){
        console.error('Error in Doctor_signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const Doctor_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctorExist = await Doctor.findOne({ email: email });
        if (!doctorExist) {
            res.status(404).json({ message: " Not found please Register!" });
            return;
        }  else if (doctorExist.is_banned) {
            res.status(403).json({ message: " UnAuthorized!" });
            return;
        } else if(!doctorExist.is_registered){
            res.status(403).json({ message: " Not registered Yet!" })
        }       
        else {
            const isMatch = await comparedata(password, doctorExist.password);
            if (!isMatch) {
                res.status(401).json({ message: "Wrong password" });
                return;
            } else {
                const token = jwt.sign(
                    {
                        doctor: doctorExist._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30d"
                    }
                );
                res.status(200).json({ token: token,message:"successfully Logined.." });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
const fetch_doctor = async (req, res) => {
    try {
      const token = req.cookies.doctortoken;
      console.log(token ,"===>token in doctor")
      if (!token) {
        return res.status(401).json({ error: "Unauthorized1" });
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) {
        return res.status(401).json({ error: "Unauthorized2" });
      }
      const data = await Doctor.findById(verified.doctor);
      if (!data) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({data});
    } catch (error) {
      console.error("error while fetch data:", error);
    }
  };

module.exports={
    Doctor_signup,
    Doctor_login,
    fetch_doctor
}