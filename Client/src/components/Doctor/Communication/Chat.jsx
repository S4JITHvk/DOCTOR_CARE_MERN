import React, { useState, useEffect } from 'react';
import { FaVideo, FaSearch, FaEllipsisV } from 'react-icons/fa';
import Api from "../../API/DoctorCareApi";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


function Chat() {
  const location = useLocation();
  const Data = location.state.action;
  const Doctor = useSelector((state) => state.doctor);
  const User = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


  return (
    <div className="flex h-[88vh] bg-gray-200">
      <div className="w-1/4 bg-white border-r h-full overflow-y-auto">
        <div className="p-4 bg-blue-700 text-white flex justify-between items-center">
          <h3 className="text-lg font-semibold">Chats</h3>
          <FaSearch className="text-xl cursor-pointer" />
        </div>
        <div>
          {users.map((user) => (
            <div
              key={user._id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                user._id === selectedUser?._id ? 'bg-gray-100' : ''
              }`}
              onClick={() => selectUser(user)}
            >
              <img
                src={user.avatar || '/assets/user.png'}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{user.name}</span>
                <span className="text-sm text-gray-500">Last message</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-blue-700 text-white">
          <div className="flex items-center">
            <img
              src={selectedUser?.avatar || '/assets/user.png'}
              alt={selectedUser?.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{selectedUser?.name}</h3>
              <span className="text-sm text-gray-300">Online</span>
            </div>
          </div>
          <div className="flex items-center">
            <FaVideo className="text-xl cursor-pointer mx-2" />
            <FaEllipsisV className="text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-4 max-w-xs rounded-lg shadow ${
                msg.sender === (isDoctor ? Doctor.doctor._id : User.user._id)
                  ? 'bg-green-100 self-end rounded-br-none'
                  : 'bg-white rounded-bl-none'
              }`}
            >
              <span className="font-semibold">{msg.sender === (isDoctor ? Doctor.doctor._id : User.user._id) ? 'Me' : selectedUser?.name}: </span>{msg.content}
            </div>
          ))}
        </div>
        <div className="flex items-center p-2 bg-white border-t">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded-full mr-2 focus:outline-none focus:ring focus:ring-green-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
