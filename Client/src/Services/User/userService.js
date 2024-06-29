import Api from "../../API/DoctorCareApi"

export const doctorList=async(data)=>{
    try{
        const response = await Api.get(`/doctorList`, {
            params: {
              page: data.currentPage,
              limit: data.itemsPerPage,
              experience: data.experienceFilter,
              gender: data.genderFilter,
              search: data.searchQuery,
            },
          });
          return response
    }catch(err){
        console.log("Error in doctorlist fetching in userside",err.message)
    }
}

export const userbooking=async(doctorId)=>{
    try{
        const response = await Api.get(`/doctorBookings/${doctorId}`);
          return response
    }catch(err){
        console.log("Error in userbooking Api",err.message)
    }
}
export const yourBooking=async(userid)=>{
    try{
        const response = await Api.get(`/your-appointments/${userid}`);;
          return response
    }catch(err){
        console.log("Error in fetching appointments Api",err.message)
    }
}
export const Editprofile=async(formData)=>{
    try{
        const response = await  Api.post('/editprofile', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response
    }catch(err){
        console.log("Error in Edit user profile Api",err.message)
    }
}
export const deleteprofilepic=async()=>{
    try{
        const response = await  Api.post('/deleteprofilepic');
          return response
    }catch(err){
        console.log("Error in delete propic Api",err.message)
    }
}

export const payment_checkoutsession=async(data)=>{
    try{
        const response = await Api.post('/payment-checkout-session', {
            doctorId: data.doctorId,
            userId: data.userId,
            date: data.date,
            shift: data.shift,
          });
          return response
    }catch(err){
        console.log("Error in payment checkout session Api",err.message)
    }
}