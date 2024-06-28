import Api from "../../API/DoctorCareApi"


export const docedit_profile=async(formData)=>{
    try{
    const response= await Api.post('/doctor/editprofile', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response
    }catch(err){
        console.log("Error in doc edit_profile APi",err.message)
    }
}
export const doc_profilepic=async()=>{
    try{
    const response= await  Api.post('/doctor/deleteprofilepic');
     return response
    }catch(err){
        console.log("Error in doc edit profile pic APi",err.message)
    }
}
export const slotUpdate=async(data)=>{
    try{
    const response= await Api.post('/doctor/slotupdate', data);
     return response
    }catch(err){
        console.log("Error in doc slot update APi",err.message)
    }
}
export const fetchappointment=async(selectedDate,doctorId)=>{
    try{
    const response= await Api.get(`/doctor/appointments/${selectedDate}/${doctorId}`);
     return response
    }catch(err){
        console.log("Error in doc fetch appointments APi",err.message)
    }
}
export const cancelappointment=async(id)=>{
    try{
    const response= await Api.post(`/doctor/appointments/${id}/cancel`);
     return response
    }catch(err){
        console.log("Error in doc fetch appointments APi",err.message)
    }
}
