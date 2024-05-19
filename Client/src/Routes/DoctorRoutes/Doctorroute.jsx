import React ,{useEffect}from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from '../../components/Loader/Loader';
import{setDoctor} from "../../ReduxStore/features/doctorSlice"
const Doctorsignup=lazy(()=> import("../../Pages/Doctors/Doctorsignup"))
const Doctorslogin=lazy(()=>import("../../Pages/Doctors/Login"))
const Dashboard=lazy(()=>import("../../Pages/Doctors/Dashboard"))
import Api from "../../API/DoctorCareApi"
import { useDispatch ,useSelector} from 'react-redux';
function Doctorroute() {
    const doctor=useSelector((state)=>state.doctor)
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await Api.get('/doctor/fetchdoctor');
            console.log(response.data,"==>doctor")
            dispatch(setDoctor(response.data.data)); 
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        if(!doctor.doctor){
            fetchUser(); 
        }              
      }, [dispatch]);
  return (
    <>
    <Suspense fallback={<Loader/>}>
  <Routes>
    {doctor && doctor.doctor ? (
      <Route path="/" element={<Dashboard />} />
    ) : (
      <Route path="/" element={<Navigate to="/doctor/login" />} />
    )}

    {!doctor || !doctor.doctor ? (
      <Route path="/signup" element={<Doctorsignup />} />
    ) : (
      <Route path="/signup" element={<Navigate to="/doctor" />} />
    )}

    {!doctor || !doctor.doctor ? (
      <Route path="/login" element={<Doctorslogin />} />
    ) : (
      <Route path="/login" element={<Navigate to="/doctor" />} />
    )}
  </Routes>
</Suspense>

    </>
  )
}

export default Doctorroute
