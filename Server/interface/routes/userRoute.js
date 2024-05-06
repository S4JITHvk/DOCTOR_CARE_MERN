const express=require('express')
const Router = express.Router()
const userController=require('../../usecases/userControl')
const otpController=require('../../usecases/otpControl')


Router.post('/usersignup',userController.userSignup)
Router.post('/otp-verify',otpController.verifyOtp)
Router.post('/login',userController.userLogin)
Router.post('/forget_pass_req',userController.forgetpassword)
Router.post('/newpassword',userController.newpass_reset)


module.exports = Router