import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import Login from "../../Pages/Users/Login";
import Signup from "../../Pages/Users/Signup";
import Otp from "../../components/Otp/Otp";
import Email from "../../components/Otp/Emailform";
import ResetPass from "../../components/Otp/Newpass";
import Home from "../../Pages/Users/Home";
import { setUser } from "../../ReduxStore/features/userSlice";
import Api from "../../API/DoctorCareApi";
import AdminDash from "../../Pages/Admin/AdminDash"
import AdminRoutes from "../adminRoutes/AdminRoutes";
import UsersList from "../../components/Admin/UsersList";
function UserRoute() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("fn called here")
      try {
        const response = await Api.get('/fetchuser');
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    if (!userData.data) {
      fetchUserData();
    }
  }, []);
 console.log(userData,"===>")

  return (
    <Routes>
      <Route path="/admin" element={userData.user && userData.user.role==="ADMIN"?<AdminDash/>:<Navigate to="/login"/>}/>
      <Route path="/home" element={userData.user && userData.user?.is_verified && userData.user?.role ==="USER" ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!userData.user || !userData.user.is_verified ? <Login /> : userData.user.role==="ADMIN"? <Navigate to="/admin" />:<Navigate to="/home"/>} />
      <Route path="/usersignup" element={!userData.user || !userData.user.is_verified?<Signup />:<Navigate to='/home'/>} />
      <Route path="/Otp" element={<Otp />} />
      <Route path="/emailfrom" element={<Email />} />
      <Route path="/Resetpass" element={<ResetPass />} />
    </Routes>
  );
}

export default UserRoute;
