const { Server } =require( "socket.io");
const http =require( "http");
const express =require( "express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
	},
});

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});

  // Typing status
  socket.on("typing", () => {
    const receiverId = getReceiverSocketId(userId); 
    if (receiverId) {
     io.emit("typing", { userId });
    }
  });

  socket.on("stopTyping", () => {
    const receiverId = getReceiverSocketId(userId); 
    if (receiverId) {
      io.emit("stopTyping", { userId });
    }
  });
	// video call
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
});

module.exports ={ app, io, server ,getReceiverSocketId};