import React,{useEffect} from 'react'
import { Outlet, useNavigate,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function DoctorAuth() {
  const navigate = useNavigate();
  const doctor= useSelector((state) => state.doctor);
  console.log(doctor,"===><in authin")
  useEffect(() => {
    if (doctor?.doctor) {
      navigate("/doctor");
    } 
  }, [doctor.doctor, navigate]);

  return <>{!doctor.doctor ? <Outlet /> : <Navigate to='/doctor'/>}</>;
}

export default DoctorAuth
