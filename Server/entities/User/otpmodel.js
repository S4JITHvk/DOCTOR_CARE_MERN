const mongoose=require('mongoose')
const OTPschema= mongoose.Schema({
    email:String,
    otp:String,
    createdAt:Date,
    expireAt:Date
})
const OTP =mongoose.model("OTP",OTPschema);
module.exports=OTP;