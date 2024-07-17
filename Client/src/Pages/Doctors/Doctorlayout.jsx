import React, { useState, useEffect } from 'react';
import Doctorsider from '../../components/Doctor/Doctorsidebar';
import Doctorhead from '../../components/Doctor/Doctorhead';
import { useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';

const Doctorlayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const Doctor = useSelector((state) => state.doctor);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [children, Doctor]); 

  return (
    <div className="flex flex-col h-screen">
      {Doctor.doctor.is_verified && <Doctorhead />}
      <div className="flex flex-1 overflow-hidden">
        {Doctor.doctor.is_verified && (
          <>
            <div className="flex-none w-64 bg-gray-300 hidden sm:block">
              <Doctorsider />
            </div>
            <div className={`fixed sm:hidden z-20 bg-gray-300 h-screen p-4 sm:p-10 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <Doctorsider />
            </div>
            {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 sm:hidden" onClick={toggleSidebar}></div>}
            <button onClick={toggleSidebar} className="text-2xl sm:hidden fixed top-4 left-4 z-30">
              <FaBars />
            </button>
          </>
        )}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Doctorlayout;
