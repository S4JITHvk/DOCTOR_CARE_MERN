import Api from '../API/DoctorCareApi'
import { setUser } from '../ReduxStore/features/userSlice';
 const fetchUser = async (dispatch) => {
  try {
    const response = await Api.get('/fetchuser');
    dispatch(setUser(response.data.data));
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
export default fetchUser