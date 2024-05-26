const express=require('express')
const Router = express.Router()
const DoctorControl=require("../../usecases/Doctor/doctorControl")
const multer = require('multer');
const storage = require("../../util/multerConfig");
const upload = multer({ storage: storage });

Router.post("/signup",DoctorControl.Doctor_signup)
Router.post("/login",DoctorControl.Doctor_login)
Router.get("/fetchdoctor",DoctorControl.fetch_doctor)
Router.post('/editprofile',upload.single('profilePic'),DoctorControl. edit_profile )
Router.post('/deleteprofilepic',DoctorControl.delete_propic)

module.exports=Router