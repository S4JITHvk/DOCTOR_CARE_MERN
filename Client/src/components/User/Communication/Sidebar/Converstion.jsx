import { useSocketContext } from "../../../../Socket/Context/SocketContext";
import { useConversation } from "../../../../Socket/zustand/useConversation";

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500  p-2 py-2 cursor-pointer ${
          isSelected ? "bg-gray-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div >
            <img src={conversation?.profile || "/assets/doc.png"} alt="user avatar" className={`w-8 rounded-full border-2 ${
              isOnline ? "border-green-500" : ""
            }`} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold">(DR) {conversation?.name}</p>
            <span className="text-xl">{}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
