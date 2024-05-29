import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
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
      <Route path="/emailform" element={<Email />} />
      <Route path="/Resetpass" element={<ResetPass />} />
    </Route>
    
    <Route element={<Protect role="USER" />}>    
      <Route path="/home" element={<><Header /> <Home /><Footer/></>} />
      <Route path="/Doctors" element={<><Header /><Doctor/> <Footer/></>}/>
      <Route path="/Profile" element={<><Header /><Profile/> <Footer/></>}/>
      <Route path="/Newpassword" element={<><Header /><Newpass/><Footer/></>}/>
    </Route>
  </Routes>
</Suspense>
    </>
  );
}

export default UserRoute;
