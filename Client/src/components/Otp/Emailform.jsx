import React from 'react';

function EmailForm() {
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
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Enter Your Email</h2>
        <form className="space-y-4">
          <div className="flex justify-center">
            <input
              type="email"
              className="w-64 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
            Back to login_
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</a>
          </p>
      </div>
    </div>
  );
}

export default EmailForm;
