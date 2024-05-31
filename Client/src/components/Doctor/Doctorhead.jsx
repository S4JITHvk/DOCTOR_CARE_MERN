import React from 'react';

function Doctorhead() {
  return (
    <header className="bg-gray-300 z-10 ml-0">
      <div className="max-w-7xl flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <img src="/assets/mindcare.jpg" alt="Logo" className="h-8 w-8 rounded-full" />
          <h1 className="text-3xl font-bold tracking-tight text-black ml-2">
            Mind <span className='text-red-600'>Care</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Doctorhead;
