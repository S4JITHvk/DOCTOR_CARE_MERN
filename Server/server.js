const express=require('express')
const app=express()
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const connect = require("./infrastructure/config/mongodb");
const userRoute=require("./interface/routes/userRoute")
const adminRoute=require("./interface/routes/adminRoute")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));


connect();
// Route middleware
app.use('/api',userRoute)
app.use('/api/admin',adminRoute)

app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT))