import { useSelector } from "react-redux";
import { useConversation } from "../../../../Socket/zustand/useConversation";
import { format } from 'date-fns';

function Message({ message }) {
  const authUser = useSelector((state) => state.user.user);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const chatClassName = fromMe ? "justify-end" : "justify-start";
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-700";

  const formattedTime = format(new Date(message.createdAt), 'p'); 
  const isVoiceMessage = message.messageType === 'voice';
  const isImageMessage = message.messageType === 'image';

  return (
    <div className={`flex ${chatClassName} mb-4 mt-2`}>
      <div className={`relative max-w-xs px-4 py-2 text-white rounded-lg ${bubbleColor}`}>
        {isVoiceMessage ? (
          <audio controls>
            <source src={message.message} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        ) : isImageMessage ? (
          <img src={message.message} alt="Sent image" className="max-w-full h-auto rounded-lg" />
        ) : (
          <p>{message.message}</p>
        )}
        <div className="text-xs text-black-400 mt-1">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;


