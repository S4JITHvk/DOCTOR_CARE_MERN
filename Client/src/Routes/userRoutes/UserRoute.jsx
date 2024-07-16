import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
const Home = lazy(() => import("../../Pages/Users/Home"));
const Login = lazy(() => import("../../Pages/Users/Login"));
const Signup = lazy(() => import("../../Pages/Users/Signup"));
const Otp= lazy(() => import("../../components/Auth/Otp/Otp"));
const Email = lazy(() => import("../../components/Auth/Otp/Emailform"));
const ResetPass = lazy(() => import("../../components/Auth/Otp/Newpass"));
const Doctor=lazy(()=>import("../../components/User/Doctorlist"))
const Guest=lazy(()=>import("../../Pages/Users/Guest"))
const Header=lazy(()=>import("../../components/Home/Header"))
const Footer=lazy(()=>import("../../components/Home/Footer"))
const Profile=lazy(()=>import("../../Pages/Users/Profile"))
const Newpass=lazy(()=>import("../../components/User/Profile/Changepass"))
const Paymentpage=lazy(()=>import("../../components/User/Payment/Payment"))
const Paymentsuccess=lazy(()=>import("../../components/User/Payment/Success"))
const Paymentfailure=lazy(()=>import("../../components/User/Payment/Failure"))
const Myappointments=lazy(()=>import("../../components/User/YourAppointments/Appointments"))
const Chat=lazy(()=>import("../../components/User/Communication/Chat"))
const Favcomp=lazy(()=>import("../../components/User/Profile/Favoritedoc"))
const Aboutus=lazy(()=>import("../../Pages/Users/AboutUs"))
import Authenticate from "../../components/Auth/Authenticate";
import RedirectToCall from "../../components/User/Communication/VideoCall/Videomodal";
import Protect from "../../components/Auth/Protect";
import Loader from "../../components/Loader/Loader";
import fetchUser from "../../Services/usersFetch";
import { useDispatch, useSelector } from "react-redux";
function UserRoute() { 
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!User.user) {
      console.log("here calling")
      fetchUser(dispatch);
    }
  }, [User]);
  return (
    <>
<Suspense fallback={<Loader />}>
  <Routes>
    <Route element={<Authenticate />}>
      <Route path="/" element={<Guest/>} />
      <Route path="/login" element={ <Login />} />
      <Route path="/usersignup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/emailform" element={<Email />} />
      <Route path="/Resetpass" element={<ResetPass />} />
    </Route>
    <Route element={<Protect role="USER" />}>    
      <Route path="/home" element={<><Header /> <Home /><Footer/></>} />
      <Route path="/Doctors" element={<><Header /><Doctor/> <Footer/></>}/>
      <Route path="/Profile" element={<><Header /><Profile/> <Footer/></>}/>
      <Route path="/Aboutus" element={<><Header /><Aboutus /><Footer/></>} />
      <Route path="/Newpassword" element={<><Header /><Newpass/><Footer/></>}/>
      <Route path="/Yourappointments" element={<><Header /><Myappointments/><Footer/></>}/>
      <Route path="/Payment_process" element={<><Header /><Paymentpage/><Footer/></>}/>
      <Route path="/payment-success" element={<><Header /><Paymentsuccess/><Footer/></>}/>
      <Route path="/payment-cancel" element={<><Header /><Paymentfailure/><Footer/></>}/>
      <Route path="/Communicate" element={<><Header /><Chat/></>}/>
      <Route path="/redirectToCall" element={<><Header /><RedirectToCall /><Footer/></>} />
      <Route path="/favorite-doctor" element={<><Header /><Favcomp /><Footer/></>} />
    </Route>
  </Routes>
</Suspense>
    </>
  );
}
export default UserRoute;
