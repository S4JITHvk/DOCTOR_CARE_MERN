import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {clearDoctor} from "../../ReduxStore/features/doctorSlice"
import profilePlaceholder from '/assets/doctor.jpg'
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
    <div className="col-span-4 sm:col-span-3">
      <div className="bg-gray-300 shadow h-screen p-10">
        <div className="flex flex-col items-center">
          {/* <h1 className="text-xl font-bold">
            Doctor <span className="text-red-500">Care</span>
          </h1> */}
          <img
              className="h-24 w-24 rounded-full mt-1"
              src={doctorData.doctor?.profile || profilePlaceholder}
              alt="Profile"
            />
          <h1 className="text-xl font-bold">{doctorData.doctor.name}</h1>
          <p className="text-gray-700 ">{doctorData.doctor.expertise}</p>
          {/* <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link to="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</Link>
            <Link to="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</Link>
          </div> */}
        </div>
        <hr className="my-6 border-t border-gray-300" />
        <div className="flex flex-col">
          <ul>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/profile" className="block">
                  Dashboard
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/" className="block">
                  Patients
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/" className="block">
                  Appointments
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/notifications" className="block">
                  Notifications
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/Newpassword" className="block">
                  Change Password
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
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
