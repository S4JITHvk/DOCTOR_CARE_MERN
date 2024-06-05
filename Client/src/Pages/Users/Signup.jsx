import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  isEmpty,
  isPasswordValid,
  isEmailValid,
  passwordcheck,
} from "../../helpers/validation";
import Api from "../../API/DoctorCareApi";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
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
    const hasError =
      Object.values(error).some((err) => err) ||
      Object.values(errordef).some((err) => err);
    if (hasError) {
      const timer = setTimeout(() => {
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
      return () => clearTimeout(timer);
    }
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
      const response = await Api.post("/google-login", { email, name });
      if (response.status === 200) {
        const { token } = response.data;
        document.cookie = `token=${token}`;
        window.location.reload();
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status) setErrorMessage(data.message);
      toast.error(data.message);
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

    if (isEmpty(userData.email)) {
      errors.emailred = true;
      errorMessages.emailerr = "Email can't be empty";
    } else if (!isEmailValid(userData.email)) {
      errors.emailred = true;
      errorMessages.emailerr = "Enter a valid email";
    }
    if (isEmpty(userData.name)) {
      errors.namered = true;
      errorMessages.nameerr = "Name can't be empty";
    }
    if (isEmpty(userData.password)) {
      errors.passwordred = true;
      errorMessages.passworderr = "Password can't be empty";
    } else {
      const passwordValidationResult = isPasswordValid(userData.password);
      if (!passwordValidationResult.valid) {
        errors.passwordred = true;
        errorMessages.passworderr = passwordValidationResult.message;
      } else {
        errors.passwordred = false;
        errorMessages.passworderr = "";
      }
    }
    if (isEmpty(userData.confirmpassword)) {
      errors.confirmpasswordred = true;
      errorMessages.confirmpassworderr = "Confirm password can't be empty";
    } else if (passwordcheck(userData.password, userData.confirmpassword)) {
      errors.confirmpasswordred = true;
      errorMessages.confirmpassworderr = "Passwords don't match";
    }

    setError(errors);
    seterrordef(errorMessages);

    try {
      if (
        !errors.emailred &&
        !errors.namered &&
        !errors.passwordred &&
        !errors.confirmpasswordred
      ) {
        const response = await Api.post("/usersignup", userData, {
          withCredentials: true,
        });
        if (response.data.message === "OTP sent") {
          toast.success("Enter otp send to your mail");
          navigate("/otp", { state: { email: userData.email } });
        } else if (response.data.message === "Email exists!") {
          toast.error("Email already exists!");
          setError((previous) => ({
            ...previous,
            emailred: true,
          }));
          seterrordef((previous) => ({
            ...previous,
            emailerr: "Email already exists!",
          }));
        } else {
          console.error("Error registering user:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error in catch block:", error);
      if (error.response && error.response.data) {
        console.error("Error registering user:", error.response.data.message);
      } else {
        console.error("Error registering user:", error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        className="flex min-h-full flex-col justify-center px-10 py-12 lg:px-8"
        style={{
          backgroundImage: `url('/assets/bg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          paddingBottom: "9rem",
        }}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
            MIND CARE
          </h1>
          <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error.namered && (
                  <div className="text-red-500 mt-1">{errordef.nameerr}</div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-bold leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error.emailred && (
                  <div className="text-red-500 mt-1">{errordef.emailerr}</div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-md font-bold leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md border border-gray-300">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-1.5 text-sm font-semibold text-gray-900 bg-transparent border-l border-gray-300 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error.passwordred && (
                <div className="text-red-500 mt-1">{errordef.passworderr}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-md font-bold  leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md border border-gray-300">
                <input
                  id="confirmPassword"
                  name="confirmpassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={userData.confirmpassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-1.5 text-sm font-semibold text-gray-900 bg-transparent border-l border-gray-300 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error.confirmpasswordred && (
                <div className="text-red-500 mt-1">
                  {errordef.confirmpassworderr}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center">
            <p className="text-center text-sm text-gray-500">OR</p>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                googleAuth(decoded);
              }}
              onError={() => {
                console.log("singup Failed");
              }}
            />
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
