const express=require('express')
const Router = express.Router()
const userController=require('../../usecases/Users/userControl')
const otpController=require('../../usecases/Users/otpControl')
const multer = require('multer');
const storage = require("../../util/multerConfig");
const upload = multer({ storage: storage });
const userAuth=require("../middlewares/userAuth")

Router.post('/usersignup',userController.userSignup)
Router.post('/google-login',userController.googleAuth)
Router.post('/otp-verify',otpController.verifyOtp)
Router.post('/login',userController.userLogin)
Router.post('/forget_pass_req',userController.forgetpassword)
Router.post('/newpassword',userController.newpass_reset)
Router.post('/resend-otp',otpController.resend_otp)
Router.get('/fetchuser',userController.fetchData)
Router.post('/editprofile',userAuth,upload.single('profilePic'),userController. edit_profile )
Router.post('/deleteprofilepic',userAuth,userController.delete_propic)
Router.get('/doctorList',userAuth,userController.get_doctors)
Router.get('/doctorBookings/:doctorId',userAuth,userController.get_bookinglist)
Router.post('/payment-checkout-session',userAuth,userController.make_payment)
Router.post('/payment-checkout-session',userAuth,userController.make_payment)
Router.get('/your-appointments/:userid',userAuth,userController.your_appointments)

module.exports = Router