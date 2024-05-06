import React from 'react';

function Otp() {
  return (
    <div
      className="flex min-h-screen justify-center items-center"
      style={{
        backgroundImage: `url('/public/assets/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">DOCTOR CARE</h1>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Enter OTP</h2>
        <form className="space-y-4">
          <div className="flex justify-center">
            <input
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <input
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ml-2"
            />
            <input
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ml-2"
            />
            <input
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ml-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
