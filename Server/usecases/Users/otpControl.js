const generateOTP=require('../../util/otpGenerator')
const sendEmail=require('../../infrastructure/config/nodemailer')
const OTP=require('../../entities/User/otpmodel')
const User=require('../../entities/User/usermodel')
const Doctor=require('../../entities/Doctor/Doctormodel')
require('dotenv').config()
const {hashdata, comparedata}=require('../../util/Bcrypthash')

const sendOTP=async (email)=>{
    try{
        if(!(email)){
            throw Error("provide values for email,subject,message")
        }
        await OTP.deleteOne({email})
        const generatedOTP=await generateOTP();
        const mailOptions={
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:"Verify the email using this otp",
            html:`<p>Hello new user use the this otp to verify your email to continue </p><p style="color:tomato;font-size:25px;letter-spacing:2px;">
            <b>${generatedOTP}</b></p><p>OTP will expire in<b> 10 minute(s)</b>.</p>`
        }
        await sendEmail(mailOptions);
        const hashedData=await hashdata(generatedOTP,10);
        function addMinutesToDate(date, minutes) {
            return new Date(date.getTime() + minutes * 60000); 
          }
        const currentDate =new Date();
        const newDate = addMinutesToDate(currentDate, 10);
        const newOTP= await new OTP({
            email,
            otp:hashedData,
            createdAt:Date.now(),
            expireAt:newDate,
        })
        await newOTP.save()
    }catch(err){
        throw err;
    }
}

const verifyOtp = async (req, res) => {
    try {
        if (!req.body.otp) {
            res.status(400)
            throw new Error('OTP not found')
        }
        const otp = await OTP.findOne({ email: req.body.email });
        console.log(otp)
        if (otp) {
            const match = await comparedata(req.body.otp, otp.otp);
            if (match) {
                if(req.body.action==='User_forgot_pass' ){
                    return res.json({message:"User_reset"})
                }else if(req.body.action==='Doctor_forgot_pass'){
                     return res.json({message:"Doc_reset"})
                }
                else if(req.body.action==='Doctor'){
                    await Doctor.updateOne({email:req.body.email},{is_registered:true})
                    return res.json({message:"Doctor Registered SuccessFully"})
                }         
                else{
                await User.updateOne({ email: req.body.email }, { is_verified: true });
                res.status(200).json({message:"Successfully Registered.."})
                }
            } else {
                res.status(400).json({message:"Otp not matched"})
                
            }
        } else {
            res.status(404);
            throw new Error("email not found")
        }
    } catch (error) {
        console.log(error.message);
    }
}

const resend_otp=async(req,res)=>{
    try{
        console.log("here")
        const{email}=req.body
        if(email){
            console.log("email sended")
            sendOTP(email)
            res.status(200).json({message:"Otp resended.."})
        }else{
            res.status(400).json({message:"No credential"})
        }

    }catch(e){
        console.log(e.message)
    }
}


module.exports={
    sendOTP,
    verifyOtp,
    resend_otp
}