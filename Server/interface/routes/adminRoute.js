const express=require('express')
const Router = express.Router()
const adminControl=require("../../usecases/adminControl")
const Auth=require("../middlewares/Auth")
Router.get('/usersFetch',Auth,adminControl.usersFetch)
Router.get('/approvals',Auth,adminControl.approvals)
Router.get('/doctorlist',Auth,adminControl.doctorlist)
Router.put('/banUser/:userid',Auth,adminControl.userBan)

module.exports=Router