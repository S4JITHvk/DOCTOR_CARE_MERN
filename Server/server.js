const express = require('express');
require('dotenv').config();
const { app, server } =require("./socket/socket");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const connect = require("./infrastructure/config/mongodb");

const userRoute = require("./interface/routes/userRoute");
const adminRoute = require("./interface/routes/adminRoute");
const doctorRoute = require("./interface/routes/doctorRoute");
const webhookRoute = require("./interface/routes/webhooks");
const messageRoute = require("./interface/routes/messageRoute");

app.use('/webhook', webhookRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_HOST],
    credentials: true
}));

app.use(morgan('dev'));
connect();

// Route middleware
app.use('/profileimages', express.static('public'));
app.use('/api', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/message', messageRoute);

server.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT));


