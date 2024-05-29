import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import Authprotect from '../../components/Auth/Authprotect';
import DoctorAuth from '../../components/Auth/DoctorAuth';
import Doctorlayout from '../../Pages/Doctors/Doctorlayout'; 
import fetchDoctor from "../../Services/Doctorfetch"

const Doctorsignup = lazy(() => import('../../Pages/Doctors/Doctorsignup'));
const Doctorslogin = lazy(() => import('../../Pages/Doctors/Login'));
const Dashboard = lazy(() => import('../../Pages/Doctors/Dashboard'));
const Profile=lazy(()=>import('../../components/Doctor/DoctorProfile'))
const Newpass=lazy(()=>import("../../components/Doctor/Docchangepass"))
const Slotcomp=lazy(()=>import("../../components/Doctor/Docslotupdate"))
function Doctorroute() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDoctor(dispatch);
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Authprotect role="DOCTOR" />}>
          <Route path="/" element={  <Doctorlayout> <Dashboard /> </Doctorlayout> }/>
          <Route path="/Profile" element={<Doctorlayout><Profile/></Doctorlayout>} />
          <Route path="/Newpassword" element={<Doctorlayout><Newpass/></Doctorlayout>}/>
          <Route path="/Slotupdate" element={<Doctorlayout><Slotcomp/></Doctorlayout>}/>
        </Route>
        <Route element={<DoctorAuth />}>
          <Route path="/signup" element={<Doctorsignup />} />
          <Route path="/login" element={<Doctorslogin />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Doctorroute;
