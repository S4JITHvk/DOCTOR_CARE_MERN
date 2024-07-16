require("dotenv").config();
const Query = require("../../infrastructure/DBquerys/Users/usersCrud");
const DocQuery = require("../../infrastructure/DBquerys/Doctor/DocQuery");
const { sendOTP } = require("./otpControl");
const jwt = require("jsonwebtoken");
const { hashdata, comparedata } = require("../../util/Bcrypthash");
const path = require("path");
const fs = require("fs");
const stripeSecretKey = process.env.STRIPE_SECRETKEY;
const stripe = require("stripe")(stripeSecretKey);
const logger=require("../../util/Logger")
const userSignup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      logger.warn("Missing credentials in userSignup");
      res.status(400).json({ message: "Missing credentials" });
      return;
    }
    const exist = await Query.findbyEmail(email);
    if (exist) {
      if (exist.is_verified) {
        logger.info("Email exists in userSignup");
        return res.json({ message: "Email exists!" });
      } else if (exist.is_Deleted) {
        logger.error("Server error in userSignup: Email is marked as deleted");
        return res.json({ message: "Server Error please try again later!" });
      } else {
        await sendOTP(email);
        logger.info("OTP sent in userSignup");
        return res.status(200).json({ message: "OTP sent" });
      }
    } else {
      const data = { name, email, password };
      await Query.createUser(data);
      logger.info("New user created and OTP sent in userSignup");
      await sendOTP(email);
      return res.status(200).json({ message: "OTP sent" });
    }
  } catch (error) {
    logger.error(`Error in userSignup controller: ${error.message}`);
    return res.status(500).json({ message: "Server Error" });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Query.findbyEmail(email);

    if (!userExist) {
      logger.warn("User not found in userLogin");
      res.status(404).json({ message: "User not found" });
      return;
    } else if (!userExist.is_verified) {
      logger.warn("User not verified in userLogin");
      res.status(401).json({ message: "User not verified" });
      return;
    } else if (userExist.is_Deleted) {
      logger.error("User marked as deleted in userLogin");
      res.status(404).json({ message: "Internal server issue please try again later!" });
      return;
    } else if (userExist.is_banned) {
      logger.warn("User is banned in userLogin");
      res.status(403).json({ message: "Your Authorization Denied By Admin!." });
      return;
    } else {
      const isMatch = await comparedata(password, userExist.password);
      if (!isMatch) {
        logger.warn("Wrong password in userLogin");
        res.status(401).json({ message: "Wrong password" });
        return;
      } else {
        const token = jwt.sign({ user: userExist._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        logger.info("Successfully logged in user in userLogin");
        res.cookie('token', token,{httpOnly: true, sameSite:"none",secure:true })
        res.status(200).json({ message: "Successfully Logined.." });
      }
    }
  } catch (error) {
    logger.error(`Error in userLogin controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};


const forgetpassword = async (req, res) => {
  try {
    const { email, action } = req.body;
    if (action === "User_forgot_pass") {
      const userexist = await Query.findbyEmail(email);
      if (!userexist) {
        logger.warn("Email not found in forgetpassword for User");
        res.status(404).json({ message: "Email not found" });
      } else if (userexist.is_Deleted) {
        logger.error("Internal server issue in forgetpassword for User");
        res.status(404).json({ message: "Internal server issue" });
      } else {
        await sendOTP(email);
        logger.info("OTP sent for forgetpassword for User");
        res.json({ message: "OTP Sended ForgetPass" });
      }
    } else if (action === "Doctor_forgot_pass") {
      const Doctorexist = await DocQuery.docfindbyEmail(email);
      if (!Doctorexist) {
        logger.warn("Email not found in forgetpassword for Doctor");
        res.status(404).json({ message: "Email not found" });
      } else if (Doctorexist.is_Deleted) {
        logger.error("Internal server issue in forgetpassword for Doctor");
        res.status(404).json({ message: "Internal server issue" });
      } else {
        await sendOTP(email);
        logger.info("OTP sent for forgetpassword for Doctor");
        res.json({ message: "OTP Sended ForgetPass" });
      }
    }
  } catch (err) {
    logger.error(`Error in forgetpassword controller: ${err.message}`);
  }
};

const newpass_reset = async (req, res) => {
  try {
    const { email, password, action } = req.body;
    const hashedpass = await hashdata(password);
    if (action === "User_reset") {
      const userexist = await Query.findbyEmail(email);
      if (!userexist) {
        logger.warn("User not found in newpass_reset for User");
        res.status(400).json({ message: "user not found" });
      } else {
        await Query.Updatepassword(email, hashedpass);
        logger.info("Password changed in newpass_reset for User");
        res.status(200).json({ message: "Password changed.." });
      }
    } else if (action === "Doc_reset") {
      const doctorexist = await DocQuery.docfindbyEmail(email);
      if (!doctorexist) {
        logger.warn("Doctor not found in newpass_reset for Doctor");
        res.status(400).json({ message: "Doctor not found" });
      } else {
        await DocQuery.DocUpdatepassword(email, hashedpass);
        logger.info("Password changed in newpass_reset for Doctor");
        res.status(200).json({ message: "Password changed.." });
      }
    }
  } catch (err) {
    logger.error(`Error in newpass_reset controller: ${err.message}`);
  }
};

const fetchData = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      logger.warn("Unauthorized request in fetchData: No token provided");
      return res.status(401).json({ error: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      logger.warn("Unauthorized request in fetchData: Token verification failed");
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = await Query.findbyid(verified.user);
    if (!data) {
      logger.warn("User not found in fetchData");
      return res.status(404).json({ error: "User not found" });
    }
    logger.info("Successfully fetched data in fetchData");
    res.status(200).json({ data });
  } catch (error) {
    logger.error(`Error in fetchData controller: ${error.message}`);
  }
};
const googleAuth = async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await Query.findbyEmail(email);
    if (user) {
      if (user.is_banned) {
        logger.warn("User authorization denied by admin in googleAuth");
        return res.status(403).json({ message: "Your Authorization is Denied By Admin!" });
      } else if (user.is_Deleted) {
        logger.error("Internal server issue in googleAuth: User marked as deleted");
        return res.status(403).json({ message: "Internal server issue!" });
      }
    } else {
      const newUser = { name: name, email: email, password: "123456", is_verified: true };
      await Query.createUser(newUser);
    }
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    logger.info("Successfully logged in user in googleAuth");
    res.cookie('token', token,{httpOnly: true, sameSite:"none",secure:true })
    res.status(200).json({ message: "Successfully logged in." });
  } catch (e) {
    logger.error(`Error in googleAuth controller: ${e.message}`);
    res.status(500).json({ message: "An error occurred during authentication." });
  }
};
const edit_profile = async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Query.findbyid(verified.user);
    if (!user) {
      logger.warn("User not found in db");
      return res.status(404).json({ error: "User not found" });
    }
    let updateData = { name: req.body.name };
    if (req.file) {
      const imageUrl = user.profile;
      if (imageUrl) {
        const parsedUrl = new URL(imageUrl);
        const imageName = path.basename(parsedUrl.pathname);
        const imagePath = path.join(__dirname, "../../public", imageName);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      const path_image =
        process.env.SERVER_HOST+ `profileimages/${req.file.filename}`;
      updateData.profile = path_image;
    }
    await Query.profileUpdate(verified.user, updateData);
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    logger.error(`Error in edit profile controller: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const delete_propic = async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Query.findbyid(verified.user);
    if (!user) {
      logger.warn("User not found in db");
      return res.status(404).json({ error: "User not found" });
    }
    const imageUrl = user.profile;
    if (imageUrl) {
      const parsedUrl = new URL(imageUrl);
      const imageName = path.basename(parsedUrl.pathname);
      const imagePath = path.join(__dirname, "../../public", imageName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Query.deletepro(verified.user, { profile: "" });
    return res
      .status(200)
      .json({ message: "Profile picture deleted successfully" });
  } catch (e) {
    logger.error(`Error in delete propic controller:: ${e.message}`);
  }
};
const get_doctors = async (req, res) => {
  const { page, limit, experience, gender, search } = req.query;
  try {
    let query = { is_verified: true, is_banned: false, is_Deleted: false };
    if (experience) {
      query.experience_years = experience;
    }
    if (gender) {
      query.gender = gender;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    const result = await Query.get_doctorslist(
      query,
      parseInt(page),
      parseInt(limit)
    );
    if (result) {
      res
        .status(200)
        .json({
          Doctors: result.doctors,
          totalPages: result.totalPages,
          currentPage: result.currentPage,
        });
    } else {
      res.status(400).json({ message: "Error Fetching Doctors" });
    }
  } catch (e) {
    logger.error(`Error in delete propic controller:: ${e.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
const get_bookinglist = async (req, res) => {
  try {
    const doctorid = req.params.doctorId;
    const {List,Slots} = await Query.get_bookinglistQuery(doctorid);
    if (List) {
      return res.status(200).json({List,Slots});
    } else {
      return res.status(404).json({ message: "No list" });
    }
  } catch (e) {
    logger.error(`Error in get_bookinglist controller: : ${e.message}`);
  }
};
const make_payment = async (req, res) => {
  try {
    const { doctorId, userId, date, shift } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Appointment Payment",
              images: [process.env.SERVER_HOST+"assets/mindcare.jpg"],
            },
            unit_amount: 49900,
          },
          quantity: 1,
        },
      ],
      metadata: {
        doctorId,
        userId,
        date,
        shift,
      },
      mode: "payment",
      success_url: process.env.CLIENT_HOST+"payment-success",
      cancel_url: process.env.CLIENT_HOST+"payment-cancel",
    });
    res.json({ session: session });
  } catch (e) {
    logger.error(`Error in make payement controller:: ${e.message}`);
    res.status(500).json({ message: "Error occurred" });
  }
};
const your_appointments = async (req, res) => {
  try {
    const userId = req.params.userid;
    const appointments = await Query.yourappointments(userId);
    res.status(200).json(appointments);
  } catch (err) {
    logger.error(`Error in your_appointments controller: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
const add_favorite = async (req, res) => {
  try {
    const { doctorId, userId } = req.body;
    const response = await Query.add_favoritedoctor(doctorId, userId);
    res.status(200).json(response);
  } catch (err) {
    logger.error(`Error in add_favorite controller: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
const fetch_favoritedoctor= async (req, res) => {
  try {
    const data = req.userID ;
    const userId=data.toString();
    const response = await Query.fetch_favoritedoctor(userId);
    res.status(200).json(response);
  } catch (err) {
    logger.error(`Error in fetch_favoritedoctor controller: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
const add_review= async (req, res) => {
  try {
    const {text,userId,doctorId}=req.body
    const response = await Query.add_reviewDoc(text,userId,doctorId);
    res.status(200).json({message:"Review Added"})
  } catch (err) {
    logger.error(`Error in add_review controller: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
const fetch_review= async (req, res) => {
  try {
    const {id}=req.params
    const response = await Query.fetch_reviewDoc(id);
    res.status(200).json(response)
  } catch (err) {
    logger.error(`Error in fetch_review controller: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
const userLogout=async(req,res)=>{
  try {
    res.clearCookie('token', { httpOnly: true, sameSite:"none",secure:true });
    res.status(200).json({message:"susccessfully logout"})
  } catch (err) {
    logger.error(`Error in looutcontroller: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
}
module.exports = {
  userSignup,
  userLogin,
  forgetpassword,
  newpass_reset,
  fetchData,
  googleAuth,
  edit_profile,
  delete_propic,
  get_doctors,
  get_bookinglist,
  make_payment,
  your_appointments,
  add_favorite,
  fetch_favoritedoctor,
  add_review,
  fetch_review,
  userLogout
};
