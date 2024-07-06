import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdFavorite, MdComment } from "react-icons/md";
import {
  fetch_favdoctors,
  add_favdoctor,
} from "../../../Services/User/userService";
import Sidebar from "../Profile/Sidebar";
import toast from "react-hot-toast";
import fetchUser from "../../../Services/usersFetch";
function Favoritedoc() {
  const User = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [favoriteDoctors, setFavoriteDoctors] = useState([]);
  useEffect(() => {
    const fetchFavoriteDoctors = async () => {
      const response = await fetch_favdoctors(User._id);
      if (response.status === 200) {
        setFavoriteDoctors(response.data);
      }
    };
    fetchFavoriteDoctors();
  }, [User._id]);
  const removefavorites = async (doctor) => {
    const response = await add_favdoctor(doctor, User._id);
    if (response.status === 200) {
      setFavoriteDoctors((prevFavorites) =>
        prevFavorites.filter((favDoctor) => favDoctor._id !== doctor._id)
      );
      toast.success(response.data?.message);
      fetchUser(dispatch);
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <Sidebar />
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                Favorite Doctors
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {favoriteDoctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={doctor.profile || "/assets/doc.png"}
                      alt={doctor.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="p-3">
                      <h3 className="text-lg font-semibold text-blue-800">
                        DR {doctor.name}
                      </h3>
                      <p className="text-gray-700"> {doctor.expertise}</p>
                      <p className="text-gray-500">GENDER : {doctor.gender}</p>
                      <div className="flex mt-4">             
                        <button
                          className="px-2 py-1 bg-black text-white rounded hover:bg-blue-700 flex items-center"
                          onClick={() => removefavorites(doctor)}
                        >
                          <MdFavorite className="text-red-500 text-center" />
                        </button>
                        <Link
                          to="/Doctors"
                          state={{ Doctor: doctor }}
                          className="px-2 py-1 bg-black ml-2 text-white rounded hover:bg-blue-700"
                        >
                          Book Slot
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favoritedoc;
