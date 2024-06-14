import React, { useEffect } from 'react';
import Sidebar from "./Sidebar/Sidebar";
import MessageContainer from "./Messages/MessageContainer";
import { useConversation } from "../../../Socket/zustand/useConversation";
import { useLocation } from 'react-router-dom';

function Chat() {
  const { setSelectedConversation } = useConversation();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.data) {
      setSelectedConversation(location.state.data?.userId);
    }
  }, [location.state, setSelectedConversation]);

  return (
    <div className="flex h-[88vh] bg-gray-200">
      <Sidebar />
      <MessageContainer bookingId={location.state?.data?._id} />
    </div>
  );
}

export default Chat;
