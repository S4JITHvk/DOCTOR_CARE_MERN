const User=require("../entities/usermodel")
const {sendOTP}=require('./otpControl')
const jwt = require("jsonwebtoken");
const {hashdata, comparedata}=require('../util/Bcrypthash')

const userSignup = async (req, res) => {
    try {
        console.log("here====>",req.body)
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ message: 'Missing credentials' }); 
            return; 
        }
        const exist = await User.findOne({ email: email });
        console.log(exist)
        if (exist) {
            if (exist.is_verified) {
                console.log("email already exist ")
               return res.json({ message: "Email exists!" }); 
            } else {
                console.log("otp send")
                await sendOTP(email);
               return res.status(200).json({ message: "OTP sent" }); 
            }
        } else {
            await new User({
                name,email, password
            }).save();
            console.log("new user saved and otp send")
            await sendOTP(email);
          return  res.status(200).json({ message: "OTP sent" }); 
        }
    } catch (error) {
        console.log(error.message,"error caught");
       return res.status(500).json({ message: "Server Error" }); 
    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            res.status(404).json({ message: "User not found" });
            return;
        } else if (!userExist.is_verified) {
            res.status(401).json({ message: "User not verified" });
            return;
        } else if (userExist.is_banned) {
            res.status(403).json({ message: "Your Authorization Denied By Admin!." });
            return;
        } else {
            const isMatch = await comparedata(password, userExist.password);
            if (!isMatch) {
                res.status(401).json({ message: "Wrong password" });
                return;
            } else {
                const token = jwt.sign(
                    {
                        user: userExist._id,
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

const forgetpassword=async (req,res)=>{
    try{
        const {email}=req.body
       const  userexist=await User.findOne({email:email})
        if(!userexist){
            res.status(404).json({message:"Email not found"})
        }else{
            await sendOTP(email)
            res.json({message:"OTP Sended ForgetPass"})
        }

    }catch(err){
        console.log(err.message)
    }
}
const newpass_reset=async (req,res)=>{
    try{
        console.log(req.body,"==<>")
        const{email,password}=req.body
        const userexist=await User.findOne({email:email})
        console.log(userexist)
        if(!userexist){
            res.status(400).json({message:"user not found"})
        }else{
            hashedpassword=await hashdata(password)
            await User.updateOne({email:email},{password: hashedpassword})
            res.status(200).json({message:"Password changed.."})
        }
      
    }catch(err){
        console.log(err.message)
    }
}
const fetchData = async (req, res) => {
    try {
      const token = req.cookies.token;
      console.log(token,"===>token")
      if (!token) {
        return res.status(401).json({ error: "Unauthorized1" });
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) {
        return res.status(401).json({ error: "Unauthorized2" });
      }
      const data = await User.findById(verified.user);
      if (!data) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({data});
    } catch (error) {
      console.error("error while fetch data:", error);
    }
  };
  const logout = (req, res) => {
    try{
        res.clearCookie("token").status(200).json({ message: "Logged out" });
    }catch(err){
        console.log(err.message)
    }
   
  };          
  const googleAuth = async (req, res) => {
    try {
        const { email, name } = req.body;
        let user = await User.findOne({ email: email });
        console.log(user,"user")
        if (user) {
            if (user.is_banned) {
                return res.status(403).json({ message: "Your Authorization is Denied By Admin!" });
            }
        } else {
            const newUser = new User({
                name: name,
                email: email,
                password: '123456', 
                is_verified: true
            });
            user = await newUser.save();
        }
        const token = jwt.sign(
            {
                user: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d"
            }
        );
        res.status(200).json({ token: token, message: "Successfully logged in." });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "An error occurred during authentication." });
    }
};
module.exports={
    userSignup,
    userLogin,
    forgetpassword,
    newpass_reset,
    fetchData ,
    googleAuth,
    logout 
}