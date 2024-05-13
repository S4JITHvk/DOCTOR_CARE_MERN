import { Route, Routes } from 'react-router-dom';
import React,{useEffect} from "react";
import UserRoute from "./Routes/userRoutes/UserRoute"
import AdminRoutes from "./Routes/adminRoutes/AdminRoutes";
import Protect from './components/Auth/Protect';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './ReduxStore/features/userSlice';
import Api from "./API/DoctorCareApi"
function App() {
  const dispatch=useDispatch()
  const userData=useSelector((state)=>state.user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Api.get('/fetchuser');
        console.log(response.data,"==>mount")
        dispatch(setUser(response.data.data)); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  if(!userData.user){
    fetchUser();
  }  
  }, [dispatch]);

  return (
    <>
    <Routes>
     <Route element={<Protect role="ADMIN"/>}>
          <Route path={"/admin/*"} element={<AdminRoutes />} />
     </Route>
     <Route path={"/*"} element={<UserRoute />} />
     </Routes>
    </>
  );
}

export default App;
