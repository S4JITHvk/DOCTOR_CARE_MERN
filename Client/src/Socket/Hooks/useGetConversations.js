import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../../API/DoctorCareApi";
import { useSelector } from "react-redux";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const user = useSelector((state) => state.user);
  const doctor = useSelector((state) => state.doctor);

  useEffect(() => {
    const getConversations = async () => {
      if (!user?.user && !doctor?.doctor) return; 

      setLoading(true);
      try {
        const id =user.user?._id || doctor.doctor?._id;
        const action = user.user ? "fetchDoctorForUsers" : "fetchUsersForDoctor";
         console.log(id,action)
         const response = await Api.get('/message/conversations', { params: { id, action } });
        setConversations(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [user.user, doctor.doctor]);

  return { loading, conversations };
};

export default useGetConversations;
