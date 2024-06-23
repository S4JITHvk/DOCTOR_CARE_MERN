import { createContext, useState, useEffect, useContext, useCallback } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { useNavigate} from "react-router-dom";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const User = useSelector((state) => state.user);
  const Doctor = useSelector((state) => state.doctor);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = User?.user?._id || Doctor?.doctor?._id;
    if (userId) {
      const newSocket = io("http://localhost:3000", { query: { userId } });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("typing", (user) => {
        setTypingUsers((prevTypingUsers) => {
          if (!prevTypingUsers.some((u) => u._id === user._id)) {
            return [...prevTypingUsers, user];
          }
          return prevTypingUsers;
        });
      });

      newSocket.on("stopTyping", (user) => {
        setTypingUsers((prevTypingUsers) => {
          return prevTypingUsers.filter((u) => u._id !== user._id);
        });
      });

      newSocket.on("newunreadMessage", ({ from, unreadCount }) => {
        setUnreadMessages((prevUnreadMessages) => ({
          ...prevUnreadMessages,
          [from]: unreadCount,
        }));
      });

      newSocket.on("incomingCall", ({ personalLink }) => {
        toast((t) => (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-2 text-lg font-semibold text-gray-800">Incoming Call</p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 mr-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                
              >
                <a href={personalLink}>join now</a>
              </button>
              <button
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ));
      });
      
      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [User, Doctor, history]);

  const startTyping = useCallback(() => {
    if (socket) {
      socket.emit("typing");
    }
  }, [socket]);

  const stopTyping = useCallback(() => {
    if (socket) {
      socket.emit("stopTyping");
    }
  }, [socket]);

  const sendnewMessage = useCallback(
    (to, from) => {
      if (socket) {
        socket.emit("sendnewMessage", { to, from });
      }
    },
    [socket]
  );

  const markAsRead = useCallback(
    (to, from) => {
      if (socket) {
        socket.emit("markAsRead", { from, to });
        setUnreadMessages((prevUnreadMessages) => {
          const newUnreadMessages = { ...prevUnreadMessages };
          delete newUnreadMessages[from];
          return newUnreadMessages;
        });
      }
    },
    [socket]
  );

  const Videocall = useCallback((userId, link) => {
    if (socket) {
      socket.emit("callingUser", { userId, link });
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        typingUsers,
        unreadMessages,
        startTyping,
        stopTyping,
        sendnewMessage,
        markAsRead,
        Videocall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
