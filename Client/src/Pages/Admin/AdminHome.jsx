import React, { useState ,useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {userLogout} from"../../Services/Auth/userAuth"
import { clearUser } from "../../ReduxStore/features/userSlice";
import profilePlaceholder from "/assets/admin.png";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = async () => {
    try {
      const response=await userLogout()
      if(response.status===200){
      dispatch(clearUser());
      navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
      : "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    <div className="relative">
      <div className="flex justify-between items-center bg-gray-900 p-4 h-[84px] sm:hidden">
        <button onClick={toggleSidebar} className="text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div
        className={`fixed sm:relative z-20 bg-gray-900 h-screen p-10 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
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
                <Link to="/admin" >
                  DASHBOARD
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/userList")}>
                <Link to="/admin/userList" >
                  PATIENTS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/doctors")}>
                <Link to="/admin/doctors">
                  DOCTORS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/approvals")}>
                <Link to="/admin/approvals">
                  APPROVALS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/appointments")}>
                <Link to="/admin/appointments" >
                  BOOKINGS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/admin/cancelled_bookings")}>
                <Link to="/admin/cancelled_bookings" >
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
