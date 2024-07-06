import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { isPasswordValid, isEmpty } from "../../helpers/validation";
import { set_newpass } from "../../Services/Auth/userAuth";
function Docchangepass() {
  const Doctor = useSelector((state) => state.doctor);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = "";
    const passwordValidationResult = isPasswordValid(newPassword);
    if (!passwordValidationResult.valid) {
      error = passwordValidationResult.message;
    } else if (isEmpty(confirmPassword)) {
      error = "Confirm password can't be empty";
    } else if (newPassword !== confirmPassword) {
      error = "Passwords do not match";
    }
    if (error) {
      setErrorMessage(error);
      return;
    }
    const location = {
      state: {
        email: Doctor.doctor.email,
        action: "Doc_reset",
      },
    };
    const response = await set_newpass(location, newPassword);
    if (response.status === 200) {
      toast.success("Password reset successfully");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } else {
      setErrorMessage("Failed to reset password");
    }
  };

  return (
    <div className="col-span-4 sm:col-span-9 flex justify-center">
      <div className="bg-white shadow rounded-lg p-6 w-full h-[36rem] max-w-6xl">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
          MIND CARE
        </h1>
        <h2 className="mt-15 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          RESET PASSWORD
        </h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.071 4.929a1 1 0 010 1.414L5.757 19.071a1 1 0 01-1.414-1.414L17.657 4.929a1 1 0 011.414 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 10l-5 5-5-5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12a5 5 0 019.946 0M9 16h.01M15 16h.01"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Docchangepass;
