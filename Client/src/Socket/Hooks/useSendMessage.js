import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../ReduxStore/features/conversationSlice";
import { useSocketContext } from "../Context/SocketContext";
import toast from "react-hot-toast";
import Api from "../../API/DoctorCareApi";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector(state => state.conversation.messages);
  const selectedConversation = useSelector(state => state.conversation.selectedConversation);
  const user = useSelector(state => state.user);
  const doctor = useSelector(state => state.doctor);

  const sendMessage = async (messageContent) => {
    setLoading(true);
    try {
      let idToSend;
      if (user) {
        idToSend = user.user?._id;
      } else if (doctor) {
        idToSend = doctor.doctor?._id;
      }

      const response = await Api.post(`/messages/send/${selectedConversation._id}`, { message: messageContent, id: idToSend });
      const data = response.data;
      dispatch(setMessages([...messages, data]));

      socket.emit("sendMessage", data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
