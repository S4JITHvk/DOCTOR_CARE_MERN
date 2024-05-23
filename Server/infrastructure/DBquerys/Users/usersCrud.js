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
      const user = await findbyEmail(email);
      if (user) {
        await User.updateOne({ email: email }, { password: hashedpass });
      } else {
        throw new Error("User not found");
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  
module.exports = {
  findbyid,
  findbyEmail,
  createUser,
  Updatepassword,

};
