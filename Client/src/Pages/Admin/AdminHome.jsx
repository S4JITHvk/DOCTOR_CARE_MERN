import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { clearUser } from "../../ReduxStore/features/userSlice";
import profilePlaceholder from "/assets/admin.png";

function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const logout = () => {
    try {
      dispatch(clearUser());
      Cookies.remove("token");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path 
      ? "bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out" 
      : "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out";
  };

  return (
    <div className="col-span-4 sm:col-span-3">
      <div className="bg-gray-900 h-screen p-10">
        <div className="flex flex-col items-center">
          <img
            className="h-24 w-24 rounded-full mt-1 bg-white"
            src={profilePlaceholder}
            alt="Profile"
          />
          <h1 className="text-xl font-bold text-white">ADMIN</h1>
          <p className="text-gray-700"></p>
        </div>
        <hr className="my-6 border-t border-gray-300" />
        <div className="flex flex-col">
          <ul>
            <li className="mb-2">
              <div className={getLinkClass("/admin")}>
                <Link to="/admin" className="block">
                  DASHBOARD
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/userList")}>
                <Link to="/admin/userList" className="block">
                 PATIENTS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/doctors")}>
                <Link to="/admin/doctors" className="block">
                  DOCTORS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/approvals")}>
                <Link to="/admin/approvals" className="block">
                  APPROVALS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/appointments")}>
                <Link to="/admin/appointments" className="block">
                  BOOKINGS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/cancelled_bookings")}>
                <Link to="/admin/cancelled_bookings" className="block">
                  CANCELLED BOOKINGS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <button onClick={logout}>LOG-OUT</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
