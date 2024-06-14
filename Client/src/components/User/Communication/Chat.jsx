import React from 'react'
import Sidebar from "./Sidebar/Sidebar"
import MessageContainer from "./Messages/MessageContainer";

function Chat() {
  return (
    <div className="flex h-[88vh] bg-gray-200">
    <Sidebar />
    <MessageContainer/>
  </div>
  )
}

export default Chat
