import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { userSignup, googleLogin } from "../../Services/Auth/userAuth";
import {  isPasswordValid } from "../../helpers/validation";
import {jwtDecode} from "jwt-decode";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  
  const googleAuth = async (data) => {
    const { email, name } = data;
    try {
      await googleLogin(email, name);
    } catch (error) {
      console.log("Login Failed");
      toast.error("Login Failed");
    }
  };

  const handleSignup = async (data) => {
    const { email, name, password, confirmpassword } = data;

    try {
      const response = await userSignup({ email, name, password, confirmpassword });
      if (response.data.message === "OTP sent") {
        toast.success("Enter OTP sent to your email");
        navigate("/otp", { state: { email } });
      } else if (response.data.message === "Email exists!") {
        toast.error("Email already exists!");
        setError("email", {
          type: "manual",
          message: "Email already exists!"
        });
      } else {
        console.error("Error registering user:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-2">
          MIND CARE
        </h1>
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-2">
          Sign up for an account
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit(handleSignup)}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name can't be empty" })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email can't be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email"
                }
              })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                {...register("password", {
                  required: "Password can't be empty",
                  validate: value => {
                    const passwordValidationResult = isPasswordValid(value);
                    if (!passwordValidationResult.valid) {
                      return passwordValidationResult.message;
                    }
                    return true;
                  }
                })}
                type={showPassword ? "text" : "password"}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2.5a7.5 7.5 0 015.989 11.878l1.458 1.458A9.5 9.5 0 1010 2.5zm0 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M1.515 3.515a18.425 18.425 0 011.942 2.29l1.457 1.457a12.433 12.433 0 012.78 3.716l1.067 1.895a12.427 12.427 0 013.715 2.781l1.457 1.457a18.425 18.425 0 012.289 1.942l.54.539-1.42 1.42-.54-.539a18.425 18.425 0 01-1.942-2.29l-1.457-1.457a12.433 12.433 0 01-2.78-3.716l-1.067-1.895a12.427 12.427 0 01-3.715-2.781l-1.457-1.457a18.425 18.425 0 01-2.289-1.942l-.54-.539 1.42-1.42.54.539zm3.938 3.65l9.087 9.087-.698.698-9.087-9.087.698-.698z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              {...register("confirmpassword", {
                required: "Confirm password can't be empty",
                validate: value => {
                  if (value !== password.current) {
                    return "Passwords don't match";
                  }
                  return true;
                }
              })}
              type="password"
              className={`mt-1 block w-full px-3 py-2 border ${errors.confirmpassword ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.confirmpassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmpassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In
          </Link>
        </p>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwt_decode(credentialResponse.credential);
              googleAuth(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
              toast.error("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
