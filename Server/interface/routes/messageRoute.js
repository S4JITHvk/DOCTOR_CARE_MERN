const express = require('express');
const Router = express.Router();
const messageControl=require("../../usecases/Message/messageControl")
Router.get("/conversations",messageControl.getdatas)
Router.post("/:id/:senderId",  messageControl.getMessages);
Router.post("/send/:id/:senderId", messageControl.sendMessage);

module.exports = Router;
