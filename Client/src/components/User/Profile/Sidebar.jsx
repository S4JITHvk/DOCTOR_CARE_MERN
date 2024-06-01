import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { clearUser } from "../../../ReduxStore/features/userSlice";
import profilePlaceholder from '/assets/user.png';

function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    try {
      dispatch(clearUser());
      Cookies.remove("token");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-span-4 sm:col-span-3">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">
            Mind <span className="text-red-500">Care</span>
          </h1>
          <img
            className="h-24 w-24 rounded-full mt-4 border-2 border-gray-300"
            src={user.user?.profile || profilePlaceholder}
            alt="Profile"
          />
          <h1 className="text-xl font-semibold mt-4">{user.user.name}</h1>
          <p className="text-gray-700">{user.user.email}</p>
        </div>
        <hr className="my-6 border-t border-gray-300" />
        <div className="flex flex-col">
          <ul>
            <li className="mb-3">
              <Link to="/profile" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out text-center">
                Profile
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/favorite-doctors" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out text-center">
                Favorite Doctors
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/Yourappointments" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out text-center">
                Appointments
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/notifications" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out text-center">
                Notifications
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/Newpassword" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out text-center">
                Change Password
              </Link>
            </li>
            <li className="mb-3">
              <button
                onClick={logout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
