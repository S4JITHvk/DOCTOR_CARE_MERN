import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
const Home = lazy(() => import("../../Pages/Users/Home"));
const Login = lazy(() => import("../../Pages/Users/Login"));
const Signup = lazy(() => import("../../Pages/Users/Signup"));
const Otp= lazy(() => import("../../components/Otp/Otp"));
const Email = lazy(() => import("../../components/Otp/Emailform"));
const ResetPass = lazy(() => import("../../components/Otp/Newpass"));
const Doctor=lazy(()=>import("../../components/Home/Doctors"))
const Guest=lazy(()=>import("../../Pages/Users/Guest"))
import { setUser } from "../../ReduxStore/features/userSlice";
import Api from "../../API/DoctorCareApi";
import AdminDash from "../../components/Admin/AdminDash"
import Authenticate from "../../components/Auth/Authenticate";
import Protect from "../../components/Auth/Protect";
import Loader from "../../components/Loader/Loader";


function UserRoute() {
 
  return (
    <>
   <Suspense fallback={<Loader />}>
    <Routes>
    <Route element={<Authenticate />}>
      <Route path="/" element={<Guest/>} />
      <Route path="/login" element={ <Login />} />
      <Route path="/usersignup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/emailfrom" element={<Email />} />
      <Route path="/Resetpass" element={<ResetPass />} />
    </Route>
    <Route element={<Protect role="USER" />}>
    <Route path="/home" element={<Home />} />
    <Route path="/Doctors" element={<Doctor/>}/>
     </Route>
    </Routes>
    </Suspense>
    </>
  );
}

export default UserRoute;
