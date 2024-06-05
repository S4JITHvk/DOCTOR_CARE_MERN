import React, { useState, useEffect } from "react";
import Api from "../../../API/DoctorCareApi";
import { useSelector } from "react-redux";
import Sidebar from "../Profile/Sidebar";
import Modal from "./Viewdetails";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 8
console.log(selectedAppointment,"==.")
  const User = useSelector((state) => state.user);
  const userid = User.user._id;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Api.get(`/your-appointments/${userid}`);
        setAppointments(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function handleView(appointment) {
    setSelectedAppointment(appointment);
  }

  function handleClose() {
    setSelectedAppointment(null);
  }

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function renderPageNumbers() {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(startPage + 2, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === number
            ? "bg-blue-500 text-white"
            : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
        }`}
      >
        {number}
      </button>
    ));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <Sidebar />
          <div className="col-span-3 sm:col-span-9">
            <div className="bg-white p-4 shadow rounded-lg">
              <h1 className="text-2xl font-bold mb-4">
                {appointments.length ? "Your Appointments" : "You Have No Appointments"}
              </h1>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-3 bg-gray-200 text-gray-600 font-semibold border-b">Doctor Name</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold border-b">Expertise</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold border-b">Experience</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold border-b">Gender</th>
                      <th className="py-2 px-3 bg-gray-200 text-gray-600 font-semibold border-b">Booking Date</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold border-b">Status</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold border-b">Time</th>
                      <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAppointments.map((appointment) => (
                      <tr key={appointment._id} className="border-b">
                        <td className="py-2 px-3">DR {appointment.doctorName}</td>
                        <td className="py-2 px-4">{appointment.expertise}</td>
                        <td className="py-2 px-4">{appointment.experience}-Years</td>
                        <td className="py-2 px-4">{appointment.gender}</td>
                        <td className="py-2 px-4">{formatDate(appointment.date)}</td>
                        <td
                          className={`py-2 px-4 rounded ${
                            appointment.status === "Active"
                              ? "text-blue-500 bg-blue-100"
                              : appointment.status === "Cancelled"
                              ? "text-red-500 bg-red-100"
                              : appointment.status === "Completed"
                              ? "text-green-500 bg-green-100"
                              : ""
                          }`}
                        >
                          {appointment.status === "Active"
                            ? "Upcoming"
                            : appointment.status === "Cancelled"
                            ? "Cancelled"
                            : appointment.status === "Completed"
                            ? "Completed"
                            : appointment.status}
                        </td>
                        <td className="py-2 px-4">{appointment.shift}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleView(appointment)}
                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
                  disabled={currentPage === 1}
                >
                  <MdOutlineKeyboardDoubleArrowLeft />
                </button>
                {renderPageNumbers()}
                <button
                  onClick={handleNextPage}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <MdOutlineKeyboardDoubleArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedAppointment && (
        <Modal
          show={!!selectedAppointment}
          onClose={handleClose}
          appointment={selectedAppointment}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

export default Appointments;
