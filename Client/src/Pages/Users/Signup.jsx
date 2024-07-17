import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { userSignup, googleLogin } from "../../Services/Auth/userAuth";
import { isEmailValid, isPasswordValid, passwordcheck } from "../../helpers/validation";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    emailred: false,
    namered: false,
    passwordred: false,
    confirmpasswordred: false,
  });
  const [errordef, seterrordef] = useState({
    emailerr: "",
    nameerr: "",
    passworderr: "",
    confirmpassworderr: "",
  });

  useEffect(() => {
    const errorTimer = setTimeout(() => {
      setError({
        emailred: false,
        namered: false,
        passwordred: false,
        confirmpasswordred: false,
      });
      seterrordef({
        emailerr: "",
        nameerr: "",
        passworderr: "",
        confirmpassworderr: "",
      });
    }, 3000);
    return () => clearTimeout(errorTimer);
  }, [error, errordef]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const googleAuth = async (data) => {
    const { email, name } = data;
    try {
      googleLogin(email, name);
    } catch (error) {
      console.log("Login Failed");
      toast.error("Login Failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let errors = {
      emailred: false,
      namered: false,
      passwordred: false,
      confirmpasswordred: false,
    };

    let errorMessages = {
      emailerr: "",
      nameerr: "",
      passworderr: "",
      confirmpassworderr: "",
    };

    if (!userData.email.trim()) {
      errors.emailred = true;
      errorMessages.emailerr = "Email can't be empty";
    } else if (!isEmailValid(userData.email)) {
      errors.emailred = true;
      errorMessages.emailerr = "Enter a valid email";
    }
    if (!userData.name.trim()) {
      errors.namered = true;
      errorMessages.nameerr = "Name can't be empty";
    }
    if (!userData.password.trim()) {
      errors.passwordred = true;
      errorMessages.passworderr = "Password can't be empty";
    } else {
      const passwordValidationResult = isPasswordValid(userData.password);
      if (!passwordValidationResult.valid) {
        errors.passwordred = true;
        errorMessages.passworderr = passwordValidationResult.message;
      }
    }
    if (!userData.confirmpassword.trim()) {
      errors.confirmpasswordred = true;
      errorMessages.confirmpassworderr = "Confirm password can't be empty";
    } else if (!passwordcheck(userData.password, userData.confirmpassword)) {
      errors.confirmpasswordred = true;
      errorMessages.confirmpassworderr = "Passwords don't match";
    }
    setError(errors);
    seterrordef(errorMessages);

    if (
      !errors.emailred &&
      !errors.namered &&
      !errors.passwordred &&
      !errors.confirmpasswordred
    ) {
      try {
        const response = await userSignup(userData);
        if (response.data.message === "OTP sent") {
          toast.success("Enter OTP sent to your email");
          navigate("/otp", { state: { email: userData.email } });
        } else if (response.data.message === "Email exists!") {
          toast.error("Email already exists!");
          setError((prevError) => ({
            ...prevError,
            emailred: true,
          }));
          seterrordef((prevErrorDef) => ({
            ...prevErrorDef,
            emailerr: "Email already exists!",
          }));
        } else {
          console.error("Error registering user:", response.statusText);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
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
        <form className="space-y-2" onSubmit={handleSignup}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleChange}
              autoComplete="name"
              className={`mt-1 block w-full px-3 py-2 border ${
                error.namered ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {error.namered && (
              <p className="text-red-500 text-sm mt-1">
                {errordef.nameerr}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              autoComplete="email"
              className={`mt-1 block w-full px-3 py-2 border ${
                error.emailred ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {error.emailred && (
              <p className="text-red-500 text-sm mt-1">
                {errordef.emailerr}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={userData.password}
                onChange={handleChange}
                autoComplete="new-password"
                className={`mt-1 block w-full px-3 py-2 border ${
                  error.passwordred ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2.5a7.5 7.5 0 015.989 11.878l1.458 1.458A9.5 9.5 0 1010 2.5zm0 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.515 3.515a18.425 18.425 0 011.942 2.29l1.457 1.457a12.433 12.433 0 012.78 3.716l1.067 1.895a12.427 12.427 0 013.715 2.781l1.457 1.457a18.425 18.425 0 012.289 1.942l.54.539-1.42 1.42-.54-.539a18.425 18.425 0 01-1.942-2.29l-1.457-1.457a12.433 12.433 0 01-2.78-3.716l-1.067-1.895a12.427 12.427 0 01-3.715-2.781l-1.457-1.457a18.425 18.425 0 01-2.289-1.942l-.54-.539 1.42-1.42.54.539zm3.938 3.65l9.087 9.087-.698.698-9.087-9.087.698-.698z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {error.passwordred && (
              <p className="text-red-500 text-sm mt-1">
                {errordef.passworderr}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              value={userData.confirmpassword}
              onChange={handleChange}
              autoComplete="new-password"
              className={`mt-1 block w-full px-3 py-2 border ${
                error.confirmpasswordred ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {error.confirmpasswordred && (
              <p className="text-red-500 text-sm mt-1">
                {errordef.confirmpassworderr}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-600 text-sm">Or sign up with</p>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              googleAuth(decoded);
            }}
            onError={() => {
              console.error("Google Auth Failed");
              toast.error("Google Auth Failed");
            }}
            className="mt-2"
          >
            <button className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex items-center space-x-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <img
                className="w-5 h-5"
                src="/google-icon.svg"
                alt="Google Icon"
              />
              <span>Sign up with Google</span>
            </button>
          </GoogleLogin>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
