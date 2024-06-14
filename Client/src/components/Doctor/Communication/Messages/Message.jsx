import { useSelector } from "react-redux";
import { useConversation } from "../../../../Socket/zustand/useConversation";

function Message({ message }) {
  const authUser = useSelector((state) => state.doctor.doctor);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-700";

  return (
    <div className={`flex ${chatClassName} mb-4 mt-2`}>
      <div className={`relative max-w-xs px-4 py-2 text-white rounded-lg ${bubbleColor}`}>
        {message.message}
        {/* <div className="absolute text-xs text-gray-400 bottom-0 right-0 mt-5 mb-1 mr-1">
          12:50
        </div> */}
      </div>
    </div>
  );
}

export default Message;
