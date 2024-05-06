const User=require("../entities/usermodel")
const {sendOTP}=require('./otpControl')
const jwt = require("jsonwebtoken");
const {hashdata, comparedata}=require('../util/Bcrypthash')

const userSignup=async(req,res)=>{
    try{
        console.log("here")
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400)
            throw new Error('Missing credentials')
        }
        const exist = await User.findOne({ email: email });
        console.log(exist)
        if (exist) {
            if(exist.is_verified){
                res.status(400)
                throw new Error('Email id already exist')
            }else{
                await sendOTP(email)
            }  
        } else{
        await new User({
            email,password,name
        }).save()  
        await sendOTP(email);
       }
       return res.status(200).json({ message: "OTP sent" });    
    }catch(error){
        console.log(error.message)
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
            res.status(403).json({ message: "User is banned" });
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
        userexist=await User.findOne({email:email})
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
        const{email,newpassword}=req.body
        const userexist=await User.findOne({email:email})
        if(!userexist){
            res.status(400).json({message:"user not found"})
        }else{
            hashedpassword=await hashdata(newpassword)
            await User.updateOne({email:email},{password: hashedpassword})
            res.status(200).json({message:"Password changed.."})
        }
      
    }catch(err){
        console.log(err.message)
    }
}
             

module.exports={
    userSignup,
    userLogin,
    forgetpassword,
    newpass_reset
}