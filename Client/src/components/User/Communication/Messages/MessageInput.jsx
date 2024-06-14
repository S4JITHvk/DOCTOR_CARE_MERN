import { BsSend } from "react-icons/bs";
import useSendMessage from "../../../../Socket/Hooks/useSendMessage";
import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';
function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

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
        {/* <EmojiPicker /> */}
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (<div className="loading loading-spinner"></div>) : <BsSend />}
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
