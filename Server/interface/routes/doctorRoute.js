const express=require('express')
const Router = express.Router()
const DoctorControl=require("../../usecases/Doctor/doctorControl")
const multer = require('multer');
const storage = require("../../util/multerConfig");
const upload = multer({ storage: storage });
const doctorAuth=require("../middlewares/doctorAuth")
Router.post("/signup",DoctorControl.Doctor_signup)
Router.post("/login",DoctorControl.Doctor_login)
Router.get("/fetchdoctor",DoctorControl.fetch_doctor)
Router.post('/editprofile',doctorAuth,upload.single('profilePic'),DoctorControl. edit_profile )
Router.post('/deleteprofilepic',doctorAuth,DoctorControl.delete_propic)
Router.get('/appointments/:date/:doctorId',doctorAuth, DoctorControl.your_bookings);
Router.post('/appointments/:id/cancel',doctorAuth,DoctorControl.cancel_booking)
Router.post('/slotupdate',doctorAuth,DoctorControl.slot_update)
Router.post('/consultation/:bookingId',doctorAuth,DoctorControl.update_booking)
Router.get('/fetch-appointments/:id',doctorAuth,DoctorControl.fetch_doc)
module.exports=Router