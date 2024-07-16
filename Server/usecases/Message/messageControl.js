
const Conversation = require("../../entities/Message/Conversationmodel.js");
const Message = require("../../entities/Message/Messagemodel.js");
const MsgQuery = require("../../infrastructure/DBquerys/Messages/MsgQuery.js");
const { getReceiverSocketId, io } = require("../../socket/socket.js");
require('dotenv').config();
const logger = require("../../util/Logger.js")
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        let { id: receiverId, senderId } = req.params;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        let newMessage;
        if (req.files.voiceMessage) {
            const voicePath = process.env.SERVER_HOST + `voicemessages/${req.files.voiceMessage[0].filename}`;
            newMessage = new Message({
                senderId,
                receiverId,
                messageType: 'voice',
                message: voicePath,
            });
        } else if (req.files.image) {
            const imagePath = process.env.SERVER_HOST + `images/${req.files.image[0].filename}`;
            newMessage = new Message({
                senderId,
                receiverId,
                messageType: 'image',
                message: imagePath,
            });
        } else {
            newMessage = new Message({
                senderId,
                receiverId,
                messageType: 'text',
                message: message,
            });
        }
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
        logger.info(`Message sent from ${senderId} to ${receiverId}: ${newMessage.message}`);
    } catch (error) {
        logger.error(`Error in sendMessage controller: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
const getMessages = async (req, res) => {
    try {
        const { id: userToChatId, senderId } = req.params;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        if (!conversation) {
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
        logger.info(`Messages retrieved for conversation between ${senderId} and ${userToChatId}`);
    } catch (error) {
        logger.error(`Error in getMessages controller: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
const getdatas = async (req, res) => {
    try {
        const { id, action } = req.query;
        let conversations;
        if (action === "fetchDoctorForUsers") {
            conversations = await MsgQuery.getDoctorsForUser(id);
        } else if (action === "fetchUsersForDoctor") {
            conversations = await MsgQuery.getUsersForDoctor(id);
        }
        res.json(conversations);
        logger.info(`Data retrieved for action '${action}' with id '${id}'`);
    } catch (error) {
        logger.error(`Error in getdatas controller: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = {
    sendMessage,
    getMessages,
    getdatas,
};
