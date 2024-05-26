import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Api from "../../API/DoctorCareApi";
import { isEmailValid, isEmpty } from "../../helpers/validation";
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [errormsg,setErrorMessage]=useState('')
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!isEmailValid(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (isEmpty(formData.password)) {
      errors.password = 'Please enter your password';
    }
    if(isEmpty(formData.email)){
      errors.email="Please enter Email."
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await Api.post('/doctor/login', formData);
        console.log(response.data); 
        if(response.status===200){
          const { token } = response.data;
          document.cookie = `doctortoken=${token}; path=/`;
          window.location.reload()
        }
      }  catch (error) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 404) {
            setErrorMessage(data.message);
          } else if (status === 401) {
            setErrorMessage(data.message);
          } else if (status === 403) {
            setErrorMessage(data.message);
          } else {
            console.error('Login failed:', error.message);
            setErrorMessage('An error occurred while logging in');
          }
        } else {
          console.error('Login failed:', error.message);
          setErrorMessage('An error occurred while logging in');
        }
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-10 py-12 lg:px-8" style={{
        backgroundImage: `url('/assets/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingBottom: '10rem'
      }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">DOCTOR CARE</h1>
          <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login as a Doctor!.</h2>
        </div>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errormsg && <p className="mt-1 text-center text-red-500 text-lg font-bold">{errormsg}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email"  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.email ? 'border-red-500' : ''}`} />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                <Link
                    to="/emailform" 
                    state={{ action: "Doctor_forgot_pass" }} 
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} autoComplete="current-password"  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`} />
                {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
          <p className="mt-5 text-center text-lg text-gray-500">
            Not Registered?
            <Link to="/doctor/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
          </p>
          <p className="mt-5 text-center text-lg text-gray-500">
            Back to home?
            <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Home</Link>
          </p>
         
        </div>
      </div>
    </>
  );
}

export default Login;
