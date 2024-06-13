const express = require('express');
const Router = express.Router();
const messageControl=require("../../usecases/Message/messageControl")
Router.get("/conversations",messageControl.getdatas)
Router.get("/:id",  messageControl.getMessages);
Router.post("/send/:id", messageControl.sendMessage);

module.exports = Router;
