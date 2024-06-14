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
  console.log(user,doctor,"==>")
  const sendMessage = async (messageContent) => {
    setLoading(true);
    try {
      let idToSend;
      if (user.user) {
        idToSend = user.user?._id;
      } else if (doctor.doctor) {
        idToSend = doctor.doctor?._id;
      }
     console.log(idToSend,"idto send")
      const response = await Api.post(`/message/send/${selectedConversation._id}/${idToSend}`,{ message: messageContent});
      const data = response.data;
      setMessages([...messages, data])

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
