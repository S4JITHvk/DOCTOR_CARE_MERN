import React, { useState } from 'react';
import { FaVideo, FaSearch, FaEllipsisV } from 'react-icons/fa';

const users = [
  { id: 1, name: 'Alice', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Bob', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
  { id: 7, name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
];

const dummyMessages = [
  'Hello!',
  'Hi, how are you?',
  'I am fine, thank you! And you?',
  'I am good too, thanks!',
];

function Chat() {
  const [messages, setMessages] = useState(dummyMessages);
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const sendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="flex h-[88vh] bg-gray-200">
      {/* Users List */}
      <div className="w-1/4 bg-white border-r h-full overflow-y-auto">
        <div className="p-4 bg-blue-700 text-white flex justify-between items-center">
          <h3 className="text-lg font-semibold">Chats</h3>
          <FaSearch className="text-xl cursor-pointer" />
        </div>
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                user.id === selectedUser.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={user.avatar}
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

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-blue-700 text-white">
          <div className="flex items-center">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
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
                index % 2 === 0
                  ? 'bg-green-100 self-end rounded-br-none'
                  : 'bg-white rounded-bl-none'
              }`}
            >
              {msg}
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
