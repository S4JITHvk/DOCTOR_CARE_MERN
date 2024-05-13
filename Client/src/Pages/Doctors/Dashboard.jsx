import React from 'react';
import Pending from '../../components/Doctor/Pending';
import Doctorhome from '../../components/Doctor/Doctorhome';
import { useSelector } from 'react-redux';

function Dashboard() {
  const doctorData = useSelector((state) => state.doctor);
   console.log(doctorData ,"On home")
  return (
    <>
      {doctorData.doctor.is_verified ? <Doctorhome /> : <Pending />}
    </>
  );
}

export default Dashboard;
