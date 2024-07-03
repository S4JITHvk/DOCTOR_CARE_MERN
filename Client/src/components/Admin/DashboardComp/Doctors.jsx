import React, { useState, useEffect } from "react";
import { fetch_doctorlist } from "../../../Services/Admin/adminService";

function Doctors({ Appointments }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch_doctorlist();
        if (response.status === 200) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    setBookings(Appointments);
    fetchDoctors();
  }, [Appointments]);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const getCompletedBookingsPerMonth = (bookings, doctorId) => {
    const completedBookings = bookings.filter(
      (booking) =>
        booking.status === "Completed" && booking.doctorId._id === doctorId
    );
    const bookingsPerMonth = {};

    completedBookings.forEach((booking) => {
      const month = new Date(booking.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!bookingsPerMonth[month]) {
        bookingsPerMonth[month] = 0;
      }
      bookingsPerMonth[month] += 1;
    });

    return bookingsPerMonth;
  };

  const completedBookingsPerMonth = selectedDoctor
    ? getCompletedBookingsPerMonth(bookings, selectedDoctor._id)
    : {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div
        className="w-[100%] p-4 bg-gray-800 border-gray-600 rounded-lg overflow-y-auto"
        style={{ maxHeight: "80vh" }}
      >
        <h2 className="text-xl text-white font-semibold mb-4">Doctors List</h2>
        <ul className="space-y-2">
          {doctors.length &&
            doctors?.map((doctor) => (
              <li
                key={doctor._id}
                className={`flex items-center p-2 border rounded cursor-pointer ${
                  selectedDoctor?._id === doctor._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleDoctorSelect(doctor)}
              >
                <img
                  src={doctor.profile || "/assets/doctor.jpg"}
                  alt={`${doctor.name}'s profile`}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm">DR {doctor.name}</span>
              </li>
            ))}
        </ul>
      </div>
      <div
        className="w-[100%] p-4 bg-gray-800 border-gray-600 rounded-lg overflow-y-auto"
        style={{ maxHeight: "80vh" }}
      >
        <h2 className="text-xl text-white font-semibold mb-4">
          Doctor Completed Bookings Per Month
        </h2>
        {selectedDoctor ? (
          <div>
            <h3 className="text-lg text-white font-semibold mb-2">
              Doctor: {selectedDoctor.name}
            </h3>
            <ul className="space-y-2">
              {Object.keys(completedBookingsPerMonth).length > 0 ? (
                Object.entries(completedBookingsPerMonth).map(
                  ([month, count]) => (
                    <li key={month} className="p-2 border rounded bg-gray-100">
                      {month}: {count} bookings
                    </li>
                  )
                )
              ) : (
                <li className="p-2 border rounded bg-gray-100">
                  No completed bookings
                </li>
              )}
            </ul>
          </div>
        ) : (
          <p className="text-white">
            Please select a doctor to view their completed bookings.
          </p>
        )}
      </div>
    </div>
  );
}

export default Doctors;
