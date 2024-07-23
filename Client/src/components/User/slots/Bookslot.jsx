import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Api from "../../../API/DoctorCareApi";

Modal.setAppElement("#root");

const BookSlotModal = ({
  isOpen,
  onRequestClose,
  selectedDoctor,
  selectedDate,
  setSelectedDate,
  selectedShift,
  handleShiftSelect,
  isSlotUnavailable,
  shifts,
  handleModalClose
}) => {

    const [doctorSlots, setDoctorSlots] = useState([]);

    useEffect(() => {
      if (selectedDoctor && isOpen) {
        fetchDoctorSlots(selectedDoctor._id);
      }
    }, [selectedDoctor, isOpen]);
  
    const fetchDoctorSlots = async (doctorId) => {
      try {
        const response = await Api.get(`/doctor/fetchslots/${doctorId}`);
        setDoctorSlots(response.data);
      } catch (error) {
        console.error("Error fetching doctor slots:", error);
      }
    };
  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
    handleShiftSelect("");
  };



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Book Slot Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      {selectedDoctor && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Book Slot</h2>
          <div className="flex items-center mb-4">
            <img
              src={selectedDoctor.profile || "/assets/doc.png"}
              alt="Doctor Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">DR {selectedDoctor.name}</h3>
              <p className="text-gray-700">EXPERTISE: {selectedDoctor.expertise}</p>
              <p className="text-gray-500">EXPERIENCE: {selectedDoctor.experience_years} years</p>
              <p className="text-gray-500">GENDER: {selectedDoctor.gender}</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
              maxDate={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Available Shifts</label>
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
                    isSlotUnavailable(shift, selectedDate) ? "Slot not available" : "Slot available"
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
  );
};

export default BookSlotModal;
