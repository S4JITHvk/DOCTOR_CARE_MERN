import { BsSend, BsEmojiSmile, BsMic, BsStop, BsImage } from "react-icons/bs";
import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { ReactMic } from "react-mic";
import useSendMessage from "../../../../Socket/Hooks/useSendMessage";
import { useSocketContext } from "../../../../Socket/Context/SocketContext";
import { useConversation } from "../../../../Socket/zustand/useConversation";
function MessageInput() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();
  const { startTyping, stopTyping } = useSocketContext();

  useEffect(() => {
    if (message) {
      startTyping();
    } else {
      stopTyping();
    }
  }, [message, startTyping, stopTyping]);

  const handleEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !imageFile) return;
    if (message) {
      await sendMessage(message);
    } else if (imageFile) {
      await sendMessage(imageFile);
    }
    setMessage("");
    setImageFile(null);
  };

  const startRecording = () => setIsRecording(true);

  const stopRecording = () => setIsRecording(false);

  const onStop = (recordedBlob) => setAudioBlob(recordedBlob.blob);

  const sendVoiceMessage = async () => {
    if (!audioBlob) return;
    await sendMessage(audioBlob);
    setAudioBlob(null);
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
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
          className="absolute inset-y-0 end-28 flex items-center pe-3"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <BsEmojiSmile />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="image-upload"
          className="absolute inset-y-0 end-20 flex items-center pe-3 cursor-pointer"
        >
          <BsImage />
        </label>
        <button
          type="button"
          className="absolute inset-y-0 end-10 flex items-center pe-3"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? <BsStop /> : <BsMic />}
        </button>
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-10 right-0 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <ReactMic
          record={isRecording}
          className="hidden"
          onStop={onStop}
          mimeType="audio/webm"
        />
      </div>
      {audioBlob && (
        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-700 rounded-lg px-4 py-2"
            onClick={sendVoiceMessage}
          >
            Send Voice Message
          </button>
        </div>
      )}
      {imageFile && (
        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-700 rounded-lg px-4 py-2"
            onClick={handleSubmit}
          >
            Send Image
          </button>
        </div>
      )}
    </form>
  );
}

export default MessageInput;
