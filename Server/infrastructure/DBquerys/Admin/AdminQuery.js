const User=require("../../../entities/User/usermodel")
const Doctor=require("../../../entities/Doctor/Doctormodel")


const UserList=async()=>{
    try{
        const fetchedata = await User.find({ role: { $ne: "ADMIN" } });
        return fetchedata
    }catch(e){
    console.log(e.message)
    }
}

const Approvals=async()=>{
    try{
        const fetchedata = await Doctor.find({
            is_verified: false,
            is_registered: true,
          });
          return fetchedata
    }catch(e){
        console.log(e.message)
    }
}
const DoctorList=async()=>{
    try{
        const fetchedata = await Doctor.find({ is_verified: true });
        return fetchedata
    }catch(e){
        console.log(e.message)
    }
}
const userBan=async(id)=>{
    try{

    }catch(e){
        console.log(e.message)
    }
}


module.exports={
    UserList,
    Approvals,
    DoctorList
}