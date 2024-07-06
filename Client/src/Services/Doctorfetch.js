import Api from "../API/DoctorCareApi";
import { setDoctor } from "../ReduxStore/features/doctorSlice";

const fetchDoctor = async (dispatch) => {
  try {
    const response = await Api.get("/doctor/fetchdoctor");
    dispatch(setDoctor(response.data.data));
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
export default fetchDoctor;
