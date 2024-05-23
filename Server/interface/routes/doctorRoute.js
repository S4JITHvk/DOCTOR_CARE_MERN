const express=require('express')
const Router = express.Router()
const DoctorControl=require("../../usecases/Doctor/doctorControl")


Router.post("/signup",DoctorControl.Doctor_signup)
Router.post("/login",DoctorControl.Doctor_login)
Router.get("/fetchdoctor",DoctorControl.fetch_doctor)


module.exports=Router