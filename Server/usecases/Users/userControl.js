const User=require("../../entities/User/usermodel")
const Query=require("../../infrastructure/DBquerys/Users/usersCrud")
const Doctor=require("../../entities/Doctor/Doctormodel")
const {sendOTP}=require('./otpControl')
const jwt = require("jsonwebtoken");
const {hashdata, comparedata}=require('../../util/Bcrypthash')
const path = require('path');
const fs = require('fs')
const userSignup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).json({ message: 'Missing credentials' }); 
            return; 
        }
        const exist = await Query.findbyEmail( email );
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
            const data={
                name,email, password
            }
            await Query.createUser(data)
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
        const userExist = await Query.findbyEmail( email );
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
            console.log(userExist,"user")
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
        console.log(req.body)
        const {email,action}=req.body
        if(action==="User_forgot_pass"){
       const  userexist=await  Query.findbyEmail( email );
        if(!userexist){
            res.status(404).json({message:"Email not found"})
        }else{
            await sendOTP(email)
            res.json({message:"OTP Sended ForgetPass"})
        }
    }else if(action==="Doctor_forgot_pass"){
        const  Doctorexist=await Doctor.findOne({email:email})
        if(!Doctorexist){
            res.status(404).json({message:"Email not found"})
        }else{
            await sendOTP(email)
            res.json({message:"OTP Sended ForgetPass"})
        }
    }
    }catch(err){
        console.log(err.message)
    }
}
const newpass_reset=async (req,res)=>{
    try{
        const{email,password,action}=req.body
        const hashedpass=await hashdata(password)
        if(action==='User_reset'){
        const userexist=await  Query.findbyEmail( email );
        if(!userexist){
            res.status(400).json({message:"user not found"})
        }else{
            await Query.Updatepassword(email, hashedpass)
            res.status(200).json({message:"Password changed.."})
            
        }
    }else if(action==='Doc_reset'){
               const doctorexist=await Doctor.findOne({email:email})
               if(!doctorexist){
                res.status(400).json({message:"Doctor not found"})
            }else{
                await Doctor.updateOne({email:email},{password: hashedpass})
                res.status(200).json({message:"Password changed.."})
            }
    }
      
    }catch(err){
        console.log(err.message)
    }
}
const fetchData = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: "Unauthorized1" });
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) {
        return res.status(401).json({ error: "Unauthorized2" });
      }
      const data = await Query.findbyid(verified.user);
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
        let user = await Query.findbyEmail(email);
        if (user) {
            if (user.is_banned) {
                return res.status(403).json({ message: "Your Authorization is Denied By Admin!" });
            }
        } else {
            const newUser = {
                name: name,
                email: email,
                password: '123456', 
                is_verified: true
            }
            await Query.createUser (newUser);
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
const edit_profile = async (req, res) => {
    try {
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.JWT_SECRET);  
        const user = await Query.findbyid(verified.user );

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        let updateData = { name: req.body.name };
        if (req.file) {
            const imageUrl = user.profile;
            if ( imageUrl) {
                const parsedUrl = new URL(imageUrl);
                const imageName = path.basename(parsedUrl.pathname);
                const imagePath = path.join(__dirname, '../public', imageName);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } 
            }
            const path_image = process.env.IMAGE_PATH + `profileimages/${req.file.filename}`;
            updateData.profile = path_image;
        }
        await User.updateOne({ _id: verified.user }, { $set: updateData });
        return res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
};

const delete_propic=async(req,res)=>{
    try{
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.JWT_SECRET);  
        const user = await Query.findbyid(verified.user);

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const imageUrl = user.profile;
            if ( imageUrl) {
                const parsedUrl = new URL(imageUrl);
                const imageName = path.basename(parsedUrl.pathname);
                const imagePath = path.join(__dirname, '../public', imageName);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } 
            }
            await User.updateOne(
                { _id: verified.user },
                { $unset: { profile: "" } }
            );
    
            return res.status(200).json({ message: 'Profile picture deleted successfully' });
    }catch(e){
        console.log(e.message)
    }
}
module.exports={
    userSignup,
    userLogin,
    forgetpassword,
    newpass_reset,
    fetchData ,
    googleAuth,
    logout ,
    edit_profile ,
    delete_propic
   
}