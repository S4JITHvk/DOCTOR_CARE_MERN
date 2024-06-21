import { useSocketContext } from "../../../../Socket/Context/SocketContext";
import { useConversation } from "../../../../Socket/zustand/useConversation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers, unreadMessages, markAsRead } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const User = useSelector((state) => state.user.user);
  const unreadCount = unreadMessages[conversation._id] || 0;
  const hasUnreadMessages = unreadCount > 0;

  const handleSelectUser = () => {
    setSelectedConversation(conversation);
    markAsRead(User?._id, conversation._id);
  };

  useEffect(() => {
    if (selectedConversation) {
      markAsRead(User?._id, selectedConversation?._id);
    }
  }, [selectedConversation]);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500  p-2 py-2 cursor-pointer ${
          isSelected ? "bg-gray-500" : ""
        }`}
        onClick={() => handleSelectUser()}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div>
            <img
              src={conversation?.profile || "/assets/doc.png"}
              alt="user avatar"
              className={`w-8 rounded-full border-2 ${
                isOnline ? "border-green-500" : ""
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold">(DR) {conversation?.name}</p>
            {hasUnreadMessages && (
              <span className="text-green-500 font-bold text-sm">
                Messages {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
