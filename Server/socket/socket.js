const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

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

const userSocketMap = {};
const unreadMessages = {};
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

  // Handle new message
  socket.on("sendnewMessage", ({ to, from }) => {
    if (!unreadMessages[to]) {
      unreadMessages[to] = {};
    }
    if (!unreadMessages[to][from]) {
      unreadMessages[to][from] = 0;
    }
    unreadMessages[to][from] += 1;

    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) {
      io.emit("newunreadMessage", {
        from,
        unreadCount: unreadMessages[to][from],
      });
    }
  });

  // Mark messages as read
  socket.on("markAsRead", ({ from, to }) => {
    if (unreadMessages[to] && unreadMessages[to][from]) {
      delete unreadMessages[to][from];
    }
  });

  // video call
 

  socket.on("callingUser", ({Caller, userId, personalLink }) => {
    console.log({ userId, personalLink }, "==>");
    const receiverSocketId = getReceiverSocketId(userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("incomingCall", { Caller,personalLink });
    }
  });

 
});

module.exports = { app, io, server, getReceiverSocketId };
