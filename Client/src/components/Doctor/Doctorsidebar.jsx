import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { clearDoctor } from "../../ReduxStore/features/doctorSlice";
import profilePlaceholder from "/assets/doctor.jpg";
import {doctorLogout} from "../../Services/Auth/doctorAuth"
import { removeSlots } from "../../ReduxStore/features/slotavailableSlice";
function Doctorsidebar() {
  const navigate = useNavigate();
  const doctorData = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const location = useLocation();
  const logout = async () => {
    try {
      const response=await doctorLogout()
      if(response.status===200){
      dispatch(clearDoctor());
      dispatch(removeSlots())
      navigate("/doctor/login");
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

  return (
    <div className="col-span-4 sm:col-span-3 bg-gray-300">
      <div className="bg-gray-300 p-4 sm:p-10">
        <div className="flex flex-col items-center">
          <img
            className="h-[110px] w-[120px] rounded-full mt-1"
            src={doctorData.doctor?.profile || profilePlaceholder}
            alt="Profile"
          />
          <button className="h-6 w-32 rounded bg-blue-500 text-white font-semibold mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out">
            <Link to="/doctor/Profile">VIEW PROFILE</Link>
          </button>
          <h1 className="text-xl font-bold text-center mt-2 sm:mt-4">
            Dr. {doctorData.doctor.name}
          </h1>
          <p className="text-gray-700 text-center">
            {doctorData.doctor.expertise}
          </p>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex flex-col mt-8">
          <ul>
            <li className="mb-2">
              <div className={getLinkClass("/doctor")}>
                <Link to="/doctor" className="block">
                  DASHBOARD
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/doctor/Yourbookings")}>
                <Link to="/doctor/Yourbookings" className="block">
                  APPOINTMENTS
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/doctor/Yourslots")}>
                <Link to="/doctor/Yourslots" className="block">
                  SLOT UPDATE
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className={getLinkClass("/doctor/Newpassword")}>
                <Link to="/doctor/Newpassword" className="block">
                  EDIT PASSWORD
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <button onClick={logout}>LOGOUT</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Doctorsidebar;
