import { useEffect } from "react";
import { useConversation } from "../../../../Socket/zustand/useConversation";
import { useSocketContext } from "../../../../Socket/Context/SocketContext";
import {Link} from "react-router-dom"
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";
import { FaVideo } from "react-icons/fa";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id);
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="flex-1 flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>  
          <div className="flex items-center justify-between p-4 bg-blue-700 text-white">
            <div className="flex items-center">
              <img
                src={selectedConversation?.profile || "/assets/doc.png"}
                alt={selectedConversation?.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">
                  DR {selectedConversation?.name}
                </h3>
                <span className="text-sm text-gray-300">{isOnline?"Online":""}</span>
              </div>
            </div>
            <Link
                   to={"/Video_chat"}
                  className="px-4 py-2 bg-blue-500 mt-5 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-1"
                >
                  <FaVideo className="text-white" />
                  Video Call
                </Link>
          </div>
         
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const authUser = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <div className="px-4 text-center sm:text-xl text-green-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser?.name}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};


