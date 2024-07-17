import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import MessageContainer from "./Messages/MessageContainer";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useConversation } from "../../../Socket/zustand/useConversation";
import { useLocation } from "react-router-dom";

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSelectedConversation } = useConversation();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.data) {
      setSelectedConversation(location.state.data?.userId);
    }
  }, [location.state, setSelectedConversation]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[88vh] bg-gray-200 relative">
      <button
        className={`absolute top-5 right-4 z-50 md:hidden p-2 rounded-full shadow-lg transition-transform ${
          isSidebarOpen ? "bg-red-500" : "bg-blue-500"
        } text-white`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <AiOutlineClose className="text-3xl" />
        ) : (
          <AiOutlineMenu className="text-3xl" />
        )}
      </button>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block bg-white w-64 absolute md:relative z-40 h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <MessageContainer bookingId={location.state?.data} />
      </div>
    </div>
  );
}

export default Chat;
