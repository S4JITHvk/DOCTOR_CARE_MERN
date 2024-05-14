const express=require('express')
const Router = express.Router()
const adminControl=require("../../usecases/adminControl")

Router.get('/usersFetch',adminControl.usersFetch)
Router.get('/approvals',adminControl.approvals)
Router.get('/doctorlist',adminControl.doctorlist)
Router.put('/banUser/:userid',adminControl.userBan)

module.exports=Router