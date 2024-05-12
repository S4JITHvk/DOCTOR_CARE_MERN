import React, { useState } from 'react';
import Api from "../../API/DoctorCareApi"
import { isEmailValid, isEmpty } from "../../../helpers/validation"
import { useDispatch } from 'react-redux';
import {setUser} from "../../ReduxStore/features/userSlice"
import { useNavigate } from 'react-router-dom';
function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
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

    // Validation
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
        const response = await Api.post('/login', formData);
        console.log(response.data); 
        if(response.status===200){
          const { token } = response.data;
          document.cookie = `token=${token}`;
          const fetcheduser=await Api.get('/fetchuser')
          console.log(fetcheduser,"===>user data")
          if(fetcheduser){
            localStorage.setItem('user', JSON.stringify(fetcheduser.data.data))
            dispatch(setUser(fetcheduser.data.data))
            navigate('/home')
          }
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
        backgroundImage: `url('/public/assets/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingBottom: '10rem'
      }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">DOCTOR CARE</h1>
          <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
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
                  <a href="/emailfrom" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
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

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a href="/usersignup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
