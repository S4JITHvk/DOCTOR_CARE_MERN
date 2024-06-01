import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { clearDoctor } from "../../ReduxStore/features/doctorSlice";
import profilePlaceholder from '/assets/doctor.jpg';

function Doctorsidebar() {
  const doctorData = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const logout = () => {
    try {
      dispatch(clearDoctor());
      Cookies.remove("doctortoken");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-span-4 sm:col-span-3 bg-gray-300">
      <div className="bg-gray-300 p-4 sm:p-10">
        <div className="flex flex-col items-center">
          <img
            className="h-24 w-24 rounded-full mt-1"
            src={doctorData.doctor?.profile || profilePlaceholder}
            alt="Profile"
          />
          <button className="h-6 w-32 rounded bg-blue-500 text-white font-semibold mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out">
            <Link to="/doctor/Profile">View Profile</Link>
          </button>
          <h1 className="text-xl font-bold text-center mt-2 sm:mt-4">Dr. {doctorData.doctor.name}</h1>
          <p className="text-gray-700 text-center">{doctorData.doctor.expertise}</p>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex flex-col">
          <ul>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/doctor" className="block">
                  Dashboard
                </Link>
              </div>
            </li>
            {/* <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/doctor/Slotupdate" className="block">
                  Slot Update
                </Link>
              </div>
            </li> */}
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/doctor/Yourbookings" className="block">
                  Appointments
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/doctor/notifications" className="block">
                  Notifications
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/doctor/Newpassword" className="block">
                  Change Password
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <button onClick={logout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Doctorsidebar;
