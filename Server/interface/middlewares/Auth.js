const jwt = require("jsonwebtoken");
const User=require("../../entities/User/usermodel")
const Auth= async (req,res,next)=>{
    try{
   const token=req.cookies.token
   if(token){
      const verified=jwt.verify(token, process.env.JWT_SECRET)
      const data = await User.findById(verified.user)
      console.log(data,"==>")
      if(data){
          if(data.role==="ADMIN"){
            next()
          }else{
            res.status(404).json({message:"UnAuthorized!"})
          }
      }
   }
    }catch(e){
  console.log(e.message)
    }
}

module.exports=Auth