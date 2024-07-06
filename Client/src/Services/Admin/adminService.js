import Api from "../../API/DoctorCareApi";

export const fetchdoctor_approvalist = async () => {
  try {
    const response = await Api("/admin/approvals");
    return response;
  } catch (err) {
    console.log("Error in doctor approvals fetching Api", err.message);
  }
};
export const verify_doctor = async (doctorid) => {
  try {
    const response = await Api.put(`/admin/doctorverify/${doctorid}`);
    return response;
  } catch (err) {
    console.log("Error in doctor approvals fetching Api", err.message);
  }
};
export const fetch_bookinglist = async (data) => {
  try {
    const response = await Api.get("/admin/bookingList", {
      params: {
        page: data.page,
        date: data.date,
        doctorName: data.doctorName,
      },
    });
    return response;
  } catch (err) {
    console.log("Error in doctor fetchingbooking list Api", err.message);
  }
};
export const fetchcancelled_booking = async (page, limit) => {
  try {
    const response = await Api.get(
      `/admin/cancelled-bookings?page=${page}&limit=${limit}`
    );
    return response;
  } catch (err) {
    console.log("Error in doctor cancel booking Api", err.message);
  }
};
export const cancel_booking = async (bookingId) => {
  try {
    const response = await Api.post("/admin/booking_refund", { bookingId });
    return response;
  } catch (err) {
    console.log("Error in doctor cancel booking Api", err.message);
  }
};
export const fetch_doctorlist = async () => {
  try {
    const response = await Api("/admin/doctorlist");
    return response;
  } catch (err) {
    console.log("Error in doctor fetch Api", err.message);
  }
};
export const doctorban = async (id) => {
  try {
    const response = await Api.put(`/admin/banDoctor/${id}`);
    return response;
  } catch (err) {
    console.log("Error in doctor ban Api", err.message);
  }
};
export const doctorSoftdelete = async (id) => {
  try {
    const response = await Api.put(`/admin/deleteDoctor/${id}`);
    return response;
  } catch (err) {
    console.log("Error in user delete Api", err.message);
  }
};
export const fetch_userlist = async () => {
  try {
    const response = await Api("/admin/usersFetch");
    return response;
  } catch (err) {
    console.log("Error in users fetch Api", err.message);
  }
};
export const userban = async (userid) => {
  try {
    const response = await Api.put(`/admin/banUser/${userid}`);
    return response;
  } catch (err) {
    console.log("Error in user ban Api", err.message);
  }
};
export const userSoftdelete = async (userid) => {
  try {
    const response = await Api.put(`/admin/deleteUser/${userid}`);
    return response;
  } catch (err) {
    console.log("Error in user delete Api", err.message);
  }
};
export const fetch_allbookinglist = async () => {
  try {
    const response = await Api.get("/admin/bookingallList");
    return response;
  } catch (err) {
    console.log("Error in doctor all fetchingbooking list Api", err.message);
  }
};
