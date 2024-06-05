import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../../API/DoctorCareApi";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

function DoctorList() {
  const User = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedShift, setSelectedShift] = useState("");
  const getDate = new Date();
  getDate.setDate(getDate.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(getDate);
  const [doctorBookings, setDoctorBookings] = useState([]);
  const shifts = ["9am-10am", "11am-12pm", "2pm-3pm", "5pm-6pm", "8pm-9pm"];

  useEffect(() => {
    fetchDoctors();
  }, [currentPage, experienceFilter, genderFilter, searchQuery]);

  const fetchDoctors = async () => {
    try {
      const response = await Api.get(`/doctorList`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          experience: experienceFilter,
          gender: genderFilter,
          search: searchQuery,
        },
      });
      setDoctors(response.data.Doctors);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.error("Error fetching doctors:", e.message);
    }
  };

  const getDoctorBookings = async (doctorId) => {
    try {
      const response = await Api.get(`/doctorBookings/${doctorId}`);
      const formattedBookings = response.data.map((booking) => ({
        ...booking,
        date: new Date(booking.date),
      }));
      setDoctorBookings(formattedBookings);
    } catch (error) {
      console.error("Error fetching doctor bookings:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBookSlot = async (doctor) => {
    setSelectedDoctor(doctor);
    await getDoctorBookings(doctor._id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setSelectedShift("");
  };

  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);
  };

  // const handleBook = async () => {
  //   try {
  //     if (!selectedDoctor || !selectedShift || !selectedDate) {
  //       console.error("Doctor, shift, or date is missing.");
  //       toast.error("Please select a shift and date.");
  //       return;
  //     }
  //     const bookingData = {
  //       userId: User.user._id,
  //       doctorId: selectedDoctor._id,
  //       date: selectedDate,
  //       shift: selectedShift,
  //     };
  //     const response = await Api.post("/booking", bookingData);
  //     console.log("Booking successful:", response.data);
  //     if (response.data) {
  //       toast.success("Successfully Booked.");
  //     }
  //     handleModalClose();
  //   } catch (error) {
  //     console.error("Error booking slot:", error);
  //   }
  // };

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
    setSelectedShift("");
  };

  const filteredDoctors = doctors?.filter((doctor) => {
    return (
      (experienceFilter === "" ||
        doctor.experience_years.toString() === experienceFilter) &&
      (genderFilter === "" || doctor.gender === genderFilter) &&
      (searchQuery === "" ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="flex">
      <div className="w-1/4 p-6 bg-gray-100 h-screen sticky top-0">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Filters</h2>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Experience
            </label>
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              <option value="">All</option>
              <option value="2">2 years</option>
              <option value="5">5 years</option>
              <option value="8">8 years</option>
              <option value="10">10 years</option>
              <option value="12">12 years</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Gender
            </label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              placeholder="Search by name"
            />
          </div>
        </div>
      </div>
      <div className="w-3/4 p-6">
        <div className="flex flex-wrap gap-6">
          {filteredDoctors?.map((doctor) => (
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
                <p className="text-gray-500">
                  EXPERIENCE : {doctor.experience_years} years
                </p>
                <p className="text-gray-500">GENDER : {doctor.gender}</p>
                <div className="flex justify-between mt-4">
                  <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Reviews
                  </button>
                  <button
                    onClick={() => handleBookSlot(doctor)}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === number + 1 ? "bg-blue-700" : "bg-blue-500"
              } text-white rounded hover:bg-blue-700`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Book Slot Modal"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedDoctor && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              Book Slot
            </h2>
            <div className="flex items-center mb-4">
              <img
                src={selectedDoctor.profile || "/assets/doc.png"}
                alt="Doctor Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  DR {selectedDoctor.name}
                </h3>
                <p className="text-gray-700">
                  EXPERTISE: {selectedDoctor.expertise}
                </p>
                <p className="text-gray-500">
                  EXPERIENCE: {selectedDoctor.experience_years} years
                </p>
                <p className="text-gray-500">GENDER: {selectedDoctor.gender}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                maxDate={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Available Shifts
              </label>
              <div className="grid grid-cols-2 gap-4">
                {shifts.map((shift) => (
                  <button
                    key={shift}
                    onClick={() => handleShiftSelect(shift)}
                    className={`p-2 border rounded ${
                      doctorBookings.some(
                        (booking) =>
                          new Date(booking.date).toDateString() ===
                            selectedDate.toDateString() &&
                          booking.shift === shift
                      )
                        ? "border-red-500 text-red-500 cursor-not-allowed"
                        : selectedShift === shift
                        ? "border-green-500 text-green-500"
                        : "border-green-500"
                    }`}
                    disabled={doctorBookings.some(
                      (booking) =>
                        new Date(booking.date).toDateString() ===
                          selectedDate.toDateString() && booking.shift === shift
                    )}
                    title={
                      doctorBookings.some(
                        (booking) =>
                          new Date(booking.date).toDateString() ===
                            selectedDate.toDateString() &&
                          booking.shift === shift
                      )
                        ? "Slot not available"
                        : "Slot available"
                    }
                  >
                    {shift}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              >
                Cancel
              </button>
              {selectedShift ? (
                <Link
                  to="/Payment_process"
                state={{ 
                      selectedDoctor,
                      selectedDate,
                      selectedShift,
                    }}
                >
                  <button
                    onClick={handleModalClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Book
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 opacity-50 cursor-not-allowed"
                  disabled
                >
                  Book
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DoctorList;
