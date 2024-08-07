import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchappointment,
  cancelappointment,
} from "../../../Services/Doctor/doctorService";
const DEFAULT_SHIFTS = {
  "9am-10am": 9,
  "11am-12pm": 11,
  "2pm-3pm": 14,
  "5pm-6pm": 17,
  "8pm-9pm": 20,
};
function DocBookings() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const doctorData = useSelector((state) => state.doctor);

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  const fetchAppointments = async (date) => {
    const doctorId = doctorData.doctor._id;
    const dateto = date.toISOString().split("T")[0];
    const response = await fetchappointment(dateto, doctorId);
    if (response.status === 200) {
      if (response.data.appointments.length === 0) {
        toast.error("No appointments found");
        setAppointments([]);
      }
      setAppointments(response.data.appointments);
    } else {
      toast.error(response.data.message);
      setAppointments([]);
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Cancel this appointment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      const response = await cancelappointment(id);
      if (response.status === 200) {
        toast.success("Appointment canceled successfully");
        fetchAppointments(selectedDate);
      } else {
        toast.error("Failed to cancel appointment");
      }
    }
  };

  const canCancel = (date, shift) => {
    const currentTime = new Date();
    const appointmentDate = new Date(date);
    const shiftHour = DEFAULT_SHIFTS[shift];
    if (shiftHour === undefined) return false;
    const shiftTime = new Date(appointmentDate);
    shiftTime.setHours(shiftHour, 0, 0, 0);
    if (appointmentDate.toDateString() === currentTime.toDateString()) {
      return shiftTime - currentTime > 60 * 60 * 1000;
    }
    return true;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Select Date - </p>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border rounded px-3 py-2"
            dateFormat="yyyy-MM-dd"
            minDate={new Date(doctorData.doctor.createdAt)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b">Patient Name</th>
              <th className="py-2 px-3 border-b">Email</th>
              <th className="py-2 px-3 border-b">Booking Date</th>
              <th className="py-2 px-3 border-b">Status</th>
              <th className="py-2 px-3 border-b">Time</th>
              <th className="py-2 px-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="py-2 px-6 border-b">
                    {appointment.userId.name}
                  </td>
                  <td className="py-2 px-6 border-b">
                    {appointment.userId.email}
                  </td>
                  <td className="py-2 px-6 border-b">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-6 border-b">{appointment.status}</td>
                  <td className="py-2 px-6 border-b">{appointment.shift}</td>
                  <td className="py-2 px-6 border-b">
                    {appointment.status === "Cancelled" ? (
                      <button
                        className="bg-gray-300 text-gray-700 w-[110px] ml-10 px-4 py-2 rounded cursor-not-allowed"
                        disabled
                      >
                        Cancelled
                      </button>
                    ) : appointment.status === "Completed" ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 w-[110px] ml-10 rounded cursor-not-allowed"
                        disabled
                      >
                        Completed
                      </button>
                    ) : (
                      <>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 w-[100px]">
                          <Link
                            to="/doctor/Communicate"
                            state={{ data: appointment }}
                          >
                            Intake
                          </Link>
                        </button>
                        <button
                          onClick={() => handleCancel(appointment._id)}
                          className={`px-4 py-2 rounded w-[100px] ${
                            canCancel(appointment.date, appointment.shift)
                              ? "bg-red-500 text-white"
                              : "bg-gray-300 text-gray-700 cursor-not-allowed"
                          }`}
                          disabled={
                            !canCancel(appointment.date, appointment.shift)
                          }
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocBookings;
