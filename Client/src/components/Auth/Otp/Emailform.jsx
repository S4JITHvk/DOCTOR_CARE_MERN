import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from "../../../API/DoctorCareApi";
import {isEmailValid} from "../../../../helpers/validation"

function EmailForm() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    try {
      const response = await Api.post("/forget_pass_req", { email });
      if (response.status === 200) {
        navigate('/otp', { state: { email, action: "forgot_pass" } });
      } else {
        setErrorMessage("Email not Found");
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      setErrorMessage("Email not Found");
    }
  };

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
        {errorMessage && <p className="mt-4 text-red-500 text-center">{errorMessage}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <input
              type="email"
              className="w-64 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
