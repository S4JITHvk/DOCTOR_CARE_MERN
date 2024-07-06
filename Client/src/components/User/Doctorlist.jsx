import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdFavoriteBorder,
  MdFavorite,
  MdComment,
} from "react-icons/md";
import toast from "react-hot-toast";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  doctorList,
  userbooking,
  add_favdoctor,
  addreview,
} from "../../Services/User/userService";
import fetchUser from "../../Services/usersFetch";
import ReviewModal from "./Review/ReviewModal";
Modal.setAppElement("#root");

function DoctorList() {
  const location = useLocation();
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { Doctor } = location.state || {};
  const [doctors, setDoctors] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewModalOpen, setreviewModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedShift, setSelectedShift] = useState("");
  const getDate = new Date();
  getDate.setDate(getDate.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(getDate);
  const [doctorBookings, setDoctorBookings] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [favoriteDoctors, setFavoriteDoctors] = useState([]);
  const shifts = ["9am-10am", "11am-12pm", "2pm-3pm", "5pm-6pm", "8pm-9pm"];

  useEffect(() => {
    fetchDoctors();
  }, [currentPage, experienceFilter, genderFilter, searchQuery]);

  useEffect(() => {
    if (User?.user?.favoriteDoctors) {
      setFavoriteDoctors(User.user.favoriteDoctors);
    }
  }, [User]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (Doctor) {
        setSelectedDoctor(Doctor);
        await getDoctorBookings(Doctor._id);
        setIsModalOpen(true);
      }
    };
    fetchDoctorDetails();
  }, [Doctor]);

  const fetchDoctors = async () => {
    const data = {
      currentPage,
      itemsPerPage,
      experienceFilter,
      genderFilter,
      searchQuery,
    };
    const response = await doctorList(data);
    setDoctors(response.data.Doctors);
    setTotalPages(response.data.totalPages);
  };

  const getDoctorBookings = async (doctorId) => {
    const response = await userbooking(doctorId);
    const formattedBookings = response.data.List.map((booking) => ({
      ...booking,
      date: new Date(booking.date),
    }));
    setDoctorBookings(formattedBookings);
    setDoctorSlots(response.data.Slots);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBookSlot = async (doctor) => {
    setSelectedDoctor(doctor);
    await getDoctorBookings(doctor._id);
    setIsModalOpen(true);
  };
  const handlereview = async (doctor) => {
    setSelectedDoctor(doctor);
    setreviewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setSelectedShift("");
  };
  const handlereviewModalClose = () => {
    setreviewModalOpen(false);
    setSelectedDoctor(null);
  };
  const handleShiftSelect = (shift) => {
    setSelectedShift(shift);
  };

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
    setSelectedShift("");
  };

  const handleFavoriteToggle = async (doctor) => {
    const response = await add_favdoctor(doctor, User.user?._id);
    if (response.status === 200) {
      setFavoriteDoctors((prevFavorites) => {
        if (prevFavorites.includes(doctor._id)) {
          return prevFavorites.filter((id) => id !== doctor._id);
        } else {
          return [...prevFavorites, doctor._id];
        }
      });
      fetchUser(dispatch);
      toast.success(response.data?.message);
    }
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

  const isSlotUnavailable = (shift, selectedDate) => {
    const isBooked = doctorBookings.some(
      (booking) =>
        new Date(booking.date).toDateString() === selectedDate.toDateString() &&
        booking.shift === shift
    );
    const isInSlots = doctorSlots.some(
      (slot) =>
        new Date(slot.date).toDateString() === selectedDate.toDateString() &&
        slot.shifts.includes(shift)
    );
    return isBooked || isInSlots;
  };

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
                  <button
                    onClick={() => handlereview(doctor)}
                    className="px-3 py-2 bg-black text-white rounded hover:bg-blue-700"
                  >
                    <MdComment />
                  </button>
                  <button
                    onClick={() => handleFavoriteToggle(doctor)}
                    className="px-3 py-2 bg-black text-white rounded hover:bg-blue-700 flex items-center"
                  >
                    {favoriteDoctors.includes(doctor._id) ? (
                      <MdFavorite className="text-red-500" />
                    ) : (
                      <MdFavoriteBorder />
                    )}
                  </button>
                  <button
                    onClick={() => handleBookSlot(doctor)}
                    className="px-3 py-2 bg-black text-white rounded hover:bg-blue-700"
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
                      isSlotUnavailable(shift, selectedDate)
                        ? "border-red-500 text-red-500 cursor-not-allowed"
                        : selectedShift === shift
                        ? "border-green-500 text-green-500"
                        : "border-green-500"
                    }`}
                    disabled={isSlotUnavailable(shift, selectedDate)}
                    title={
                      isSlotUnavailable(shift, selectedDate)
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
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={handlereviewModalClose}
        doctor={selectedDoctor}
      />
    </div>
  );
}

export default DoctorList;
