import React from 'react';
import Doctorsider from '../../components/Doctor/Doctorsidebar';
import Doctorhead from '../../components/Doctor/Doctorhead';
import { useSelector } from 'react-redux';
const Doctorlayout = ({ children }) => {
  const Doctor=useSelector((state)=>state.doctor)
  return (
    <div className="flex flex-col h-screen">
    {Doctor.doctor.is_verified && <Doctorhead />}
      <div className="flex flex-1 overflow-hidden">
        {Doctor.doctor.is_verified && (
          <div className="flex-none w-64 bg-gray-100 dark:bg-gray-800">
            <Doctorsider />
          </div>
        )}
        <div className="flex-1 bg-gray-50  dark:bg-gray-900 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Doctorlayout;
