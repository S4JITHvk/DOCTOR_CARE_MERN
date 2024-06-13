import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation, setMessages } from "../../ReduxStore/features/conversationSlice"; 
import toast from "react-hot-toast";
import Api from "../../API/DoctorCareApi";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useSelector(state => state.conversation.selectedConversation); 
  const messages = useSelector(state => state.conversation.messages); 
  const user = useSelector(state => state.user); 
  const doctor = useSelector(state => state.doctor); 
  const dispatch = useDispatch();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        let idToSend = null;
        if (user) {
          idToSend = user.user?._id; 
        } else if (doctor) {
          idToSend = doctor.doctor?._id; 
        }

        if (idToSend && selectedConversation?._id) {
          const response = await Api.post(`/messages/${selectedConversation._id}`, { id: idToSend });
          const data = response.data;
          dispatch(setMessages(data));
        } else {
          throw new Error("No user or doctor data available.");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }

  }, [selectedConversation?._id, dispatch, user, doctor]);

  return { messages, loading };
};

export default useGetMessages;
