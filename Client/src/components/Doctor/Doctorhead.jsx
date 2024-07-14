import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaUser } from 'react-icons/fa'; 

function Doctorhead() {
  return (
    <header className="bg-gray-300 z-10 ml-0">
      <div className="max-w-7xl flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <img src="/assets/mindcare.jpg" alt="Logo" className="h-8 w-8 rounded-full" />
          <h1 className={`text-3xl font-bold tracking-tight text-black ml-2 ${window.innerWidth < 640 ? 'text-center' : ''}`}>
            Mind <span className='text-red-600'>Care</span>
          </h1>
        </div>
        <div className="flex items-center mt-4 sm:mt-0"> 
          <Link to="/doctor/Profile" className="mr-4"> 
            <FaUser className="text-4xl text-black hover:text-red-600" /> 
          </Link>
          <Link to="/doctor/Communicate">
            <FaComments className="text-4xl text-black hover:text-red-600" /> 
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Doctorhead;
