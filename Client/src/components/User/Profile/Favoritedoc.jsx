import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { MdFavorite, MdComment } from "react-icons/md";
import { fetch_favdoctors } from "../../../Services/User/userService";
import Sidebar from "../Profile/Sidebar";

function Favoritedoc() {
  const User = useSelector((state) => state.user.user);
  const [favoriteDoctors, setFavoriteDoctors] = useState([]);

  useEffect(() => {
    const fetchFavoriteDoctors = async () => {
      const response = await fetch_favdoctors(User._id);
      if (response.status === 200) {
        setFavoriteDoctors(response.data);
      }
    };
    if (!favoriteDoctors.length) {
      fetchFavoriteDoctors();
    }
  }, [favoriteDoctors]);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <Sidebar />
          <div className="col-span-3 sm:col-span-9">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">Favorite Doctors</h2>
              <div className="flex flex-wrap gap-6">
                {favoriteDoctors?.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={doctor.profile || "/assets/doc.png"}
                      alt={doctor.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-blue-800">
                        DR {doctor.name}
                      </h3>
                      <p className="text-gray-700">EXPERTISE : {doctor.expertise}</p>
                      <p className="text-gray-500">EXPERIENCE : {doctor.experience_years} years</p>
                      <p className="text-gray-500">GENDER : {doctor.gender}</p>
                      <div className="flex justify-between mt-4">
                        <button className="px-3 py-2 bg-black text-white rounded hover:bg-blue-700">
                          <MdComment />
                        </button>
                        <button className="px-3 py-2 bg-black text-white rounded hover:bg-blue-700 flex items-center">
                          <MdFavorite className='text-red-500' />
                        </button>
                        <Link
                          to= "/Doctors"
                          state={{Doctor: doctor }}
                          className="px-3 py-2 bg-black text-white rounded hover:bg-blue-700"
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
