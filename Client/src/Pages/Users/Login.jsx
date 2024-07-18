import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, userLogin } from "../../Services/Auth/userAuth";
import { jwtDecode}  from "jwt-decode";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const [errormsg, setErrorMessage] = useState("");

  useEffect(() => {
    if (errormsg) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        clearErrors();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errormsg, clearErrors]);

  const googleAuth = async (data) => {
    const { email, name } = data;
    try {
      await googleLogin(email, name);
      window.location.reload();
    } catch (error) {
      const { status, data } = error.response;
      if (status) setErrorMessage(data.message);
      toast.error(data.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await userLogin(data);
      if (response.status === 200) {
        window.location.reload();
      } else {
        const { status, data: errorData } = response.error;
        if (status) {
          setErrorMessage(errorData.message);
          toast.error(errorData.message);
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in");
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          MIND CARE
        </h1>
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Sign in to your account
        </h2>
        {errormsg && (
          <p className="text-center text-red-500 font-semibold mb-4">
            {errormsg}
          </p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", { required: "Please enter your email", pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email address" } })}
              autoComplete="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/emailform"
                state={{ action: "User_forgot_pass" }}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", { required: "Please enter your password" })}
              autoComplete="current-password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center mt-6">
          <p className="text-gray-500">OR</p>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              googleAuth(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            className="mt-4"
          />
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/usersignup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-gray-500">
          Back to home?{" "}
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
