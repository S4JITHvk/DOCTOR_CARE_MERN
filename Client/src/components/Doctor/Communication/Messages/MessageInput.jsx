import { BsSend, BsEmojiSmile } from "react-icons/bs";
import useSendMessage from "../../../../Socket/Hooks/useSendMessage";
import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';

function MessageInput() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();

  const handleEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      return;
    }
    await sendMessage(message);

    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative bg-white border-t">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-green-500"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-10 flex items-center pe-3"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <BsEmojiSmile />
        </button>
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (<div className="loading loading-spinner"></div>) : <BsSend />}
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-10 right-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
}

export default MessageInput;
