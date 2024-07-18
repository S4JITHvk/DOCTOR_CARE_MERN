import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doctorLogin } from "../../Services/Auth/doctorAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errormsg, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const response = await doctorLogin(data);
    if (response.status === 200) {
      window.location.reload();
    } else {
      if (response.error) {
        const { status, data } = response.error;
        if (status === 404 || status === 401 || status === 403) {
          setErrorMessage(data.message);
        } else {
          console.error("Login failed:", response.error.message);
          setErrorMessage("An error occurred while logging in");
        }
      } else {
        console.error("Login failed:", response.error.message);
        setErrorMessage("An error occurred while logging in");
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center px-10 py-12 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #72EDF2, #5151E5)", 
        paddingBottom: "10rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
        borderRadius: "8px", 
      }}
    >
      <div className="sm:w-full sm:max-w-sm border border-gray-300 rounded-lg overflow-hidden bg-white">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
          MIND CARE
        </h1>
        <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login as a Doctor!
        </h2>

        <div className="mt-10 p-6">
          {errormsg && (
            <p className="mt-1 text-center text-red-500 text-lg font-bold">
              {errormsg}
            </p>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email", {
                    required: "Please enter Email.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  autoComplete="email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                  autoComplete="current-password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-5 text-center text-lg text-gray-500">
            Not Registered?
            <Link
              to="/doctor/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
          <p className="mt-5 text-center text-lg text-gray-500">
            Back to home?
            <Link
              to="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
