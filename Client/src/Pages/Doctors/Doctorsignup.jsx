import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  isEmpty,
  isPasswordValid,
  isEmailValid,
} from "../../helpers/validation";
import {doctorSignup} from "../../Services/Auth/doctorAuth"
function Doctorsignup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    emailred: false,
    namered: false,
    passwordred: false,
    confirmpasswordred: false,
    phone_number_red: false,
    expertise_red: false,
    experience_years_red: false,
    working_Hospital_red: false,
    working_Hospital_contact_red: false,
    DOB_red: false,
    Gender_red: false,
    medical_license_no_red: false,
  });
  const [errordef, seterrordef] = useState({
    emailerr: "",
    nameerr: "",
    passworderr: "",
    confirmpassworderr: "",
    phone_number_err: "",
    expertise_err: "",
    experience_years_err: "",
    working_Hospital_err: "",
    working_Hospital_contact_err: "",
    DOB_err: "",
    Gender_err: "",
    medical_license_no_err: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone_number: "",
    expertise: "",
    experience_years: "",
    working_Hospital: "",
    working_Hospital_contact: "",
    dob: "",
    gender: "",
    medical_license_no: "",
  });
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateInputs = () => {
    let isValid = true;
    const newError = { ...error };
    const newErrorDef = { ...errordef };
    if (isEmpty(userData.name)) {
      newError.namered = true;
      newErrorDef.nameerr = "Name is required";
      isValid = false;
    } else {
      newError.namered = false;
      newErrorDef.nameerr = "";
    }
    if (isEmpty(userData.email)) {
      newError.emailred = true;
      newErrorDef.emailerr = "Email is required";
      isValid = false;
    } else if (!isEmailValid(userData.email)) {
      newError.emailred = true;
      newErrorDef.emailerr = "Invalid email address";
      isValid = false;
    } else {
      newError.emailred = false;
      newErrorDef.emailerr = "";
    }
    if (isEmpty(userData.password)) {
      newError.passwordred = true;
      newErrorDef.passworderr = "Password is required";
      isValid = false;
    }else {
      const passwordValidationResult = isPasswordValid(userData.password);
      if (!passwordValidationResult.valid) {
        newError.passwordred = true;
        newErrorDef.passworderr = passwordValidationResult.message;
        isValid = false;
      } else {
        newError.passwordred = false;
        newErrorDef.passworderr = "";
      }
    }
    if (isEmpty(userData.confirmpassword)) {
      newError.confirmpasswordred = true;
      newErrorDef.confirmpassworderr = "Please confirm your password";
      isValid = false;
    } else if (userData.password !== userData.confirmpassword) {
      newError.confirmpasswordred = true;
      newErrorDef.confirmpassworderr = "Passwords do not match";
      isValid = false;
    } else {
      newError.confirmpasswordred = false;
      newErrorDef.confirmpassworderr = "";
    }
    if (isEmpty(userData.phone_number)) {
      newError.phone_number_red = true;
      newErrorDef.phone_number_err = "Phone number is required";
      isValid = false;
    } else {
      newError.phone_number_red = false;
      newErrorDef.phone_number_err = "";
    }
    if (isEmpty(userData.expertise)) {
      newError.expertise_red = true;
      newErrorDef.expertise_err = "Expertise is required";
      isValid = false;
    } else {
      newError.expertise_red = false;
      newErrorDef.expertise_err = "";
    }
    if (isEmpty(userData.experience_years)) {
      newError.experience_years_red = true;
      newErrorDef.experience_years_err = "Experience years are required";
      isValid = false;
    } else {
      newError.experience_years_red = false;
      newErrorDef.experience_years_err = "";
    }
    if (isEmpty(userData.working_Hospital)) {
      newError.working_Hospital_red = true;
      newErrorDef.working_Hospital_err = "Working hospital is required";
      isValid = false;
    } else {
      newError.working_Hospital_red = false;
      newErrorDef.working_Hospital_err = "";
    }
    if (isEmpty(userData.dob)) {
      newError.DOB_red = true;
      newErrorDef.DOB_err = "Date of birth is required";
      isValid = false;
    } else {
      newError.DOB_red = false;
      newErrorDef.DOB_err = "";
    }
    if (isEmpty(userData.gender)) {
      newError.Gender_red = true;
      newErrorDef.Gender_err = "Gender is required";
      isValid = false;
    } else {
      newError.Gender_red = false;
      newErrorDef.Gender_err = "";
    }
    if (isEmpty(userData.working_Hospital_contact)) {
      newError.working_Hospital_contact_red = true;
      newErrorDef.working_Hospital_contact_err =
        "Working place contact is required";
      isValid = false;
    } else {
      newError.working_Hospital_contact_red = false;
      newErrorDef.working_Hospital_contact_err = "";
    }
    if (isEmpty(userData.medical_license_no)) {
      newError.medical_license_no_red = true;
      newErrorDef.medical_license_no_err = "Medical license number is required";
      isValid = false;
    } else {
      newError.medical_license_no_red = false;
      newErrorDef.medical_license_no_err = "";
    }
    setError(newError);
    seterrordef(newErrorDef);
    return isValid;
  };
  const handleSignup = async (event) => {
    event.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
        const response = doctorSignup(userData)
        if (response.status === 200) {
          toast.success("Enter otp send to your mail");
          navigate("/otp", {
            state: { email: userData.email, action: "Doctor" },
          });
        } else {
          const errorMessage =
            "Failed to register doctor. Please try again.";
          toast.error(errorMessage);
        }
    }
  };
  return (
    <>
       <div
      className="flex justify-center items-center px-10 py-12 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #72EDF2, #5151E5)", 
        paddingBottom: "10rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
        borderRadius: "8px", 
      }}
    >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="sm:w-full sm:max-w-md border-2 border-gray-200 bg-white rounded-md p-5">
          <h1 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
            MIND CARE
          </h1>
          <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register As a Doctor
          </h2>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4">
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
                  <div className="text-red-500 mt-1">
                    {errordef.passworderr}
                  </div>
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
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    placeholder="PH-9744XXXXXXX"
                    value={userData.phone_number}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.phone_number_red && (
                    <div className="text-red-500 mt-1">
                      {errordef.phone_number_err}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="expertise"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Expertise
                </label>
                <div className="mt-1">
                  <select
                    id="expertise"
                    name="expertise"
                    value={userData.expertise}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                  {error.expertise_red && (
                    <div className="text-red-500 mt-1">
                      {errordef.expertise_err}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="experience_years"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Experience (in years)
                </label>
                <div className="mt-1">
                  <input
                    id="experience_years"
                    name="experience_years"
                    type="number"
                    min="0"
                    value={userData.experience_years}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.experience_years_red && (
                    <div className="text-red-500 mt-1">
                      {errordef.experience_years_err}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="working_places"
                  className="block text-xs font-bold leading-6 text-gray-900"
                >
                  Working Hospital/Previous
                </label>
                <div className="mt-1">
                  <input
                    id="working_Hospital"
                    name="working_Hospital"
                    type="text"
                    placeholder="eg-Alshifa Hospital"
                    value={userData.working_Hospital}
                    onChange={handleChange}
                    className="block w-full  rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.working_Hospital_red && (
                    <div className="text-red-500 mt-1">
                      {errordef.working_Hospital_err}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Date of Birth
                </label>
                <div className="mt-1">
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={userData.dob}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.DOB_red && (
                    <div className="text-red-500 mt-1">{errordef.DOB_err}</div>
                  )}
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {error.Gender_red && (
                    <div className="text-red-500 mt-1">
                      {errordef.Gender_err}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="working_place_contact"
                  className="block text-xs font-bold leading-6 text-gray-900"
                >
                  Working Hospital PH-Number
                </label>
                <div className="mt-1">
                  <input
                    id="working_Hospital_contact"
                    name="working_Hospital_contact"
                    type="tel"
                    placeholder="eg-9744XXXXXXX"
                    value={userData.working_Hospital_contact}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.working_Hospital_contact_red && (
                    <div className="text-red-500 mt-1">
                      {errordef.working_Hospital_contact_err}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="medical_license_no"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Medical License Number
                </label>
                <div className="mt-1">
                  <input
                    id="medical_license_no"
                    name="medical_license_no"
                    type="text"
                    placeholder="eg-0000 0000 0000"
                    value={userData.medical_license_no}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error.medical_license_no_red && (
                    <div className="text-red-500 mt-1">
                      {errordef.medical_license_no_err}
                    </div>
                  )}
                </div>
              </div>
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
          <p className="mt-2 text-center text-sm text-gray-500">
            Already Resgisterd?{" "}
            <Link
              to="/doctor/login"
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

export default Doctorsignup;
