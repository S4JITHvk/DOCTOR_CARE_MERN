import { useState } from "react";
import { useSelector } from "react-redux";
import { useSocketContext } from "../Context/SocketContext";
import { useConversation } from "../zustand/useConversation";
import toast from "react-hot-toast";
import Api from "../../API/DoctorCareApi";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const user = useSelector(state => state.user);
  const doctor = useSelector(state => state.doctor);
  
  const sendMessage = async (messageContent) => {
    setLoading(true);
    try {
      let idToSend = user.user ? user.user._id : doctor.doctor ? doctor.doctor._id : null;
      if (!idToSend) throw new Error("User ID not found");

      const formData = new FormData();
      if (typeof messageContent === 'string') {
        formData.append('message', messageContent);
      } else {
        console.log('Sending voiceMessage:', messageContent);
        formData.append('voiceMessage', messageContent, 'voiceMessage.webm');
      }

      const response = await Api.post(`/message/send/${selectedConversation._id}/${idToSend}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const data = response.data;
      setMessages([...messages, data]);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
