import Api from "../../API/DoctorCareApi";

export const userSignup = async (userData) => {
  try {
    const response = await Api.post("/usersignup", userData, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log("Error in userSignup Api", err.message);
  }
};
export const googleLogin = async (email, name) => {
  try {
    const response = await Api.post("/google-login", { email, name });
    if (response.status === 200) {
      const { token } = response.data;
      document.cookie = `token=${token}`;
      window.location.reload();
    }
  } catch (err) {
    console.log("Error in googleLogin Api", err.message);
  }
};
export const userLogin = async (formData) => {
  try {
    const response = await Api.post("/login", formData);
    return response;
  } catch (error) {
    return { error: error.response };
  }
};
export const validateOtp = async (enteredOtp, state) => {
  try {
    const response = await Api.post("/otp-verify", {
      otp: enteredOtp,
      email: state.email,
      action: state.action,
    });
    return response;
  } catch (err) {
    console.log("Error in validateOtp Api", err.message);
  }
};
export const resendOtp = async (state) => {
  try {
    const response = await Api.post(
      "/resend-otp",
      { email: state.email },
      { withCredentials: true }
    );
    return response;
  } catch (err) {
    console.log("Error in resendOtp Api", err.message);
  }
};
export const forgetpass_emailreq = async (email, action) => {
  try {
    const response = await Api.post("/forget_pass_req", { email, action });
    return response;
  } catch (err) {
    console.log("Error in forgetpass_emailreq Api", err.message);
  }
};
export const set_newpass = async (location, newPassword) => {
  try {
    const response = await Api.post("/newpassword", {
      email: location.state.email,
      password: newPassword,
      action: location.state.action,
    });
    return response;
  } catch (err) {
    console.log("Error in set_newpass Api", err.message);
  }
};
export const userLogout = async () => {
  try {
    const response = await Api.get("/logout");
    return response;
  } catch (error) {
    return { error: error.response };
  }
};