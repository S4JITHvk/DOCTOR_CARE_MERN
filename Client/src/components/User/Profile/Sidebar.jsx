import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { clearUser } from "../../../ReduxStore/features/userSlice";
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
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">
            Doctor <span className="text-red-500">Care</span>
          </h1>

          <h1 className="text-xl mt-10 font-bold">{user.user.name}</h1>
          <p className="text-gray-700 ">{user.user.email}</p>
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
                  Profile
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/favorite-doctors" className="block">
                  Favorite Doctors
                </Link>
              </div>
            </li>
            <li className="mb-2">
              <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out">
                <Link to="/appointments" className="block">
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
                <Link to="/ResetPass" className="block">
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

export default Sidebar;
