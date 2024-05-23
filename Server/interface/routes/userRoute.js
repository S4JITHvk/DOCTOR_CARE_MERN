const express=require('express')
const Router = express.Router()
const userController=require('../../usecases/Users/userControl')
const otpController=require('../../usecases/Users/otpControl')
const multer = require('multer');
const storage = require("../../util/multerConfig");
const upload = multer({ storage: storage });

Router.post('/usersignup',userController.userSignup)
Router.post('/google-login',userController.googleAuth)
Router.post('/otp-verify',otpController.verifyOtp)
Router.post('/login',userController.userLogin)
Router.post('/forget_pass_req',userController.forgetpassword)
Router.post('/newpassword',userController.newpass_reset)
Router.post('/resend-otp',otpController.resend_otp)
Router.get('/fetchuser',userController.fetchData)
Router.post('/editprofile',upload.single('profilePic'),userController. edit_profile )
Router.post('/deleteprofilepic',userController.delete_propic)
Router.get('/logout',userController.logout)
module.exports = Router