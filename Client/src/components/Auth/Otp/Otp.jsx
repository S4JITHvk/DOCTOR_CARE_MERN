import React, { useState, useEffect } from 'react';
import Api from "../../../API/DoctorCareApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from 'react-router-dom';
function Otp() {
  

  const navigate=useNavigate()
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errors, setErrors] = useState(Array(4).fill(false));
  const [errorMessage, setErrorMessage] = useState('');
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const location = useLocation();

 
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = false; 
        return newErrors;
      });
     
    } else {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = true; 
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setErrorMessage('Please enter a 4-digit OTP');
      setErrors(Array(4).fill(true)); 
      return;
    }
    try {
      const {state}=location
      if (state && (state.action === "User_forgot_pass" || state.action === "Doctor_forgot_pass")){
        const email=state.email
        const response = await Api.post("/otp-verify", { otp: enteredOtp,email:state.email,action:state.action });
        if(response.status===200){
          navigate("/Resetpass",{state:{email,action:response.data.message}})
        }else if(response.status===400) {
          setErrorMessage("Otp Not Matched! Request denied");
        }
      }else{
      const response = await Api.post("/otp-verify", { otp: enteredOtp,email:state.email,action:state.action });
      console.log(response.data,"===>")
      if (response.status === 200) {
        toast.success(response.data.message)
        navigate('/');
      } else if(response.status===400) {
        setErrorMessage("Otp Not Matched! Request denied");
      }
    }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Otp Not Matched! Request denied");
    }
  };
  
  const handleResend = async () => {
    const {state}=location
    setTimer(60);
    setResendEnabled(false);
    try {
      const response = await Api.post('/resend-otp', { email:state.email },{withCredentials:true});
      if (response.status === 200) {
        toast.success("OTP successfully resent.");
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error.message);
      toast.error("Failed to resend OTP. Please try again.");
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
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">DOCTOR CARE</h1>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Enter OTP</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {errorMessage && <div className="text-red-500 text-xs mb-4 ml-5">{errorMessage}</div>}
          <div className="flex justify-center">
            {otp.map((value, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className={`w-10 h-10 text-center border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 ml-2 ${
                    errors[index] ? 'border-red-500' : ''
                  }`}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleResend}
            disabled={!resendEnabled}
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            Resend OTP {resendEnabled ? '' : `(${timer}s)`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;
