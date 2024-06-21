const express = require('express');
const Router = express.Router();
const messageControl=require("../../usecases/Message/messageControl")
const multer = require('multer');
const storage = require("../../util/voicemessageConfig");
const upload = multer({ storage: storage });
Router.get("/conversations",messageControl.getdatas)
Router.post("/:id/:senderId",  messageControl.getMessages);
Router.post("/send/:id/:senderId", upload.fields([{ name: 'voiceMessage', maxCount: 1 }, { name: 'image', maxCount: 1 }]), messageControl.sendMessage);

module.exports = Router;
