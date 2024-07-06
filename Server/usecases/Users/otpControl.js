const generateOTP=require('../../util/otpGenerator')
const sendEmail=require('../../infrastructure/config/nodemailer')
const AuthQuery=require("../../infrastructure/DBquerys/Users/AuthQuery")
require('dotenv').config()
const {hashdata, comparedata}=require('../../util/Bcrypthash')
const logger=require("../../util/Logger")
const sendOTP = async (email) => {
    try {
        if (!email) {
            throw Error("provide values for email,subject,message");
        }
        await AuthQuery.deleteotp(email);
        const generatedOTP = await generateOTP();
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify the email using this otp",
            html: `<p>Hello new user use the this otp to verify your email to continue </p><p style="color:tomato;font-size:25px;letter-spacing:2px;">
            <b>${generatedOTP}</b></p><p>OTP will expire in<b> 10 minute(s)</b>.</p>`
        };
        await sendEmail(mailOptions);
        const hashedData = await hashdata(generatedOTP, 10);
        function addMinutesToDate(date, minutes) {
            return new Date(date.getTime() + minutes * 60000); 
        }      
        const currentDate = new Date();
        const newDate = addMinutesToDate(currentDate, 10);
        const newOTP = {
            email,
            otp: hashedData,
            createdAt: Date.now(),
            expireAt: newDate,
        };
        await AuthQuery.OtpSave(newOTP);
        logger.info(`OTP sent to ${email} successfully.`);
    } catch (err) {
        logger.error(`Error sending OTP to ${email}: ${err.message}`);
        throw err;
    }
};
const verifyOtp = async (req, res) => {
    try {
        if (!req.body.otp) {
            res.status(400);
            throw new Error('OTP not found');
        }
        const otp = await AuthQuery.otpfindbyEmail(req.body.email);
        logger.info(`OTP retrieved from database for ${req.body.email}: ${otp}`);
        if (otp) {
            const match = await comparedata(req.body.otp, otp.otp);
            if (match) {
                if (req.body.action === 'User_forgot_pass') {
                    return res.json({ message: "User_reset" });
                } else if (req.body.action === 'Doctor_forgot_pass') {
                    return res.json({ message: "Doc_reset" });
                } else if (req.body.action === 'Doctor') {
                    await AuthQuery.Docupdate(req.body.email);
                    return res.json({ message: "Doctor Registered SuccessFully" });
                } else {
                    await AuthQuery.Userupdate(req.body.email);
                    res.status(200).json({ message: "Successfully Registered.." });
                }
            } else {
                res.status(400).json({ message: "Otp not matched" });
            }
        } else {
            res.status(404);
            throw new Error("email not found");
        }
    } catch (error) {
        logger.error(`Error in verifyOtp for ${req.body.email}: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const resend_otp = async (req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            logger.info(`Resending OTP to ${email}`);
            await sendOTP(email);
            res.status(200).json({ message: "Otp resended.." });
        } else {
            res.status(400).json({ message: "No credential" });
        }
    } catch (e) {
        logger.error(`Error in resend_otp: ${e.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = {
    sendOTP,
    verifyOtp,
    resend_otp
};
