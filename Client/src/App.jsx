import { Route, Routes } from 'react-router-dom';
import React,{useEffect} from "react";
import UserRoute from "./Routes/userRoutes/UserRoute"
import Protect from './components/Auth/Protect';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './ReduxStore/features/userSlice';
import Api from "./API/DoctorCareApi"
import  { Toaster } from "react-hot-toast";
import Doctorroute from './Routes/DoctorRoutes/Doctorroute';
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";
import fetchUser  from './Services/usersFetch';
function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    fetchUser(dispatch); 
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    <Routes>
     <Route element={<Protect role="ADMIN"/>}>
          <Route path={"/admin/*"} element={<AdminRoutes />} />
     </Route>
     <Route path={"/*"} element={<UserRoute />} />
     <Route path={"/doctor/*"} element={<Doctorroute/>} />
     </Routes>
    </>
  );
}

export default App;
