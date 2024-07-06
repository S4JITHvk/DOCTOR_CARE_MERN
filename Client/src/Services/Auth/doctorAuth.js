import Api from "../../API/DoctorCareApi";
export const doctorSignup = async (userData) => {
  try {
    const response = await Api.post("/doctor/signup", userData);
    return response;
  } catch (err) {
    console.log("Error in doctorSignup Api", err.message);
  }
};
export const doctorLogin = async (formData) => {
  try {
    const response = await Api.post("/doctor/login", formData);
    return response;
  } catch (error) {
    return { error: error.response };
  }
};
