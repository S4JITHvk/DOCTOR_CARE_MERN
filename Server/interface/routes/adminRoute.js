const express=require('express')
const Router = express.Router()
const adminControl=require("../../usecases/adminControl")

Router.get('/usersFetch',adminControl.usersFetch)




module.exports=Router