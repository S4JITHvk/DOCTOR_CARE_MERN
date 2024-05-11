const users=require("../entities/usermodel")
const usersFetch=async(req,res)=>{
    try{
        console.log("here")
const fetchedata=await users.find({ role: { $ne: 'ADMIN' } })
if(fetchedata){
    return res.status(200).json({data:fetchedata})
}else{
    return res.status(400)
}
    }catch(e){
    console.log(e.message)
    }
}


module.exports={
    usersFetch
}