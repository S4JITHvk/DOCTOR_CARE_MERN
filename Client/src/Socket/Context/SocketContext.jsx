import { createContext, useState, useEffect, useContext ,useCallback} from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    const userId = User?.user?._id || Doctor?.doctor?._id;

    if (userId) {
      const newSocket = io("http://localhost:3000", {
        query: { userId },
      });

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

      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else if (socket) {
      socket.close();
      setSocket(null);
    }
  }, [User, Doctor]);

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

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, typingUsers, startTyping, stopTyping }}>
      {children}
    </SocketContext.Provider>
  );
};
