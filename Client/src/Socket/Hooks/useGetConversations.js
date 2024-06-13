import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../../API/DoctorCareApi";
import { useSelector } from "react-redux";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const user = useSelector((state) => state.user.user);
  const doctor = useSelector((state) => state.doctor.doctor);

  useEffect(() => {
    const getConversations = async () => {
      if (!user && !doctor) return; 

      setLoading(true);
      try {
        const id = user?._id || doctor?._id;
        const action = user ? "fetchDoctorForUsers" : "fetchUsersForDoctor";

        const response = await Api.get('/message/conversations', { id, action });

        setConversations(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [user, doctor]);

  return { loading, conversations };
};

export default useGetConversations;
