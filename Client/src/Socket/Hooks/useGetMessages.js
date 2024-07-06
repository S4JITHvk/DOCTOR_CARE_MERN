import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useConversation } from "../zustand/useConversation";
import toast from "react-hot-toast";
import Api from "../../API/DoctorCareApi";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const User = useSelector((state) => state.user);
  const doctor = useSelector((state) => state.doctor);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const idToSend = User.user?._id || doctor.doctor?._id;
        if (!idToSend) {
          throw new Error("No user or doctor data available.");
        }
        const response = await Api.post(
          `/message/${selectedConversation._id}/${idToSend}`
        );
        const data = response.data;
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, User.user, doctor.doctor, setMessages]);
  return { messages, loading };
};
export default useGetMessages;
