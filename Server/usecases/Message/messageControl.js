const Conversation =require( "../../entities/Message/Conversationmodel.js");
const Message =require( "../../entities/Message/Messagemodel.js");
const MsgQuery=require("../../infrastructure/DBquerys/Messages/MsgQuery.js")
const { getReceiverSocketId, io }=require("../../socket/socket.js")
const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.body.id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.body.id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getdatas=async (req,res)=>{
try{
    const { id, action } = req.body;
      let conversations;
      if (action === "fetchDoctorForUsers") {
        conversations = await MsgQuery. getDoctorsForUser(id);
      } else if (action === "fetchUsersForDoctor") {
        conversations = await MsgQuery.getUsersForDoctor (id);
      }
  
      res.json(conversations);
}catch (error) {
		console.log("Error in getdatas controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}







module.exports={
    sendMessage,
    getMessages,
    getdatas
}