const User = require("../../../entities/User/usermodel");

const findbyid = async (id) => {
  try {
    const data = await User.findOne({_id:id});
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const findbyEmail = async (email) => {
  try {
    const data = await User.findOne({ email: email });
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};
const createUser = async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
    } catch (e) {
      console.error(e.message);
    }
  };
  const Updatepassword = async (email, hashedpass) => {
    try {
        await User.updateOne({ email: email }, { password: hashedpass });
    } catch (e) {
      console.error(e.message);
    }
  };
  const profileUpdate=async (id,data)=>{
    try{
     await User.updateOne({ _id: id }, { $set: data})
    }catch(err){
      console.log(err.message)
    }
  }
  const deletepro=async(id,data)=>{
    try{
  await User.updateOne({_id:id},{$unset:data})
    }catch(e){
      console.log(e.message)
    }
  }
  const saveUser = async (user) => {
    try {
      await user.save();
    } catch (err) {
      throw new Error('Error saving user');
    }
  };
  
module.exports = {
  findbyid,
  findbyEmail,
  createUser,
  Updatepassword,
  profileUpdate,
  deletepro,
  saveUser
};
