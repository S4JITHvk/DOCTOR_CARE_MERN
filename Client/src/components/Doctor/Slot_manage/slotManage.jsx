import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import{slotUpdate,fetchappointment} from "../../../Services/Doctor/doctorService"
function SlotManage() {
  const getDate = new Date();
  getDate.setDate(getDate.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(getDate.toISOString().split('T')[0]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [deselectedSlots, setdedelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [doctorUpdatedSlots, setDoctorUpdatedSlots] = useState([]);
  const doctorData = useSelector((state) => state.doctor);
  const slots = [
    '9am-10am',
    '11am-12pm',
    '2pm-3pm',
    '5pm-6pm',
    '8pm-9pm',
  ];

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setSelectedSlots([]);
    setBookedSlots([]);
    setDoctorUpdatedSlots([]);
  };

  const toggleSlotSelection = (slot) => {
    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((s) => s !== slot)
        : [...prevSlots, slot]
    );
  };

  const handleSubmit = async () => {
    const data = {
      date: selectedDate,
      slots: selectedSlots,
      doctorId: doctorData.doctor._id,
    };
      const response = await slotUpdate(data)
      if (response.status === 200) {
        alert('Slots locked successfully');
        setDoctorUpdatedSlots((prev) => [...prev, ...selectedSlots]);
        setSelectedSlots([])
      } else {
        alert('Failed to book slots');
      }
  };

  const fetchAppointments = async () => {
    const doctorId = doctorData.doctor._id;
      const response = await fetchappointment(selectedDate,doctorId);
      if (response.status === 200) {
        setBookedSlots(response.data.appointments.map(appointment => appointment.shift));
        const updatedSlots = response.data.Slots[0]?.shifts || []; 
        setDoctorUpdatedSlots(updatedSlots);
      } else {
        console.error('Failed to fetch appointments');
      }
  };


  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate, doctorData.doctor._id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Slots</h1>
      <div className="mb-4">
    <h1 className='font-bold mt-5'>SELECT DATE</h1>
        <DatePicker       
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                maxDate={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Available Slots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot) => (
            <div key={slot} data-tooltip-id={slot} data-tooltip-content={doctorUpdatedSlots.includes(slot) ? "This slot is locked" : "This slot is already booked by the patient"}>
              <button
                onClick={() => toggleSlotSelection(slot)}
                disabled={bookedSlots.includes(slot) || doctorUpdatedSlots.includes(slot)}
                className={`p-4 w-48 rounded-lg border-2 transition duration-200 ease-in-out transform hover:scale-105 ${
                  bookedSlots.includes(slot) || doctorUpdatedSlots.includes(slot)
                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed border-gray-400'
                    : selectedSlots.includes(slot)
                    ? 'bg-blue-500 text-white border-blue-700'
                    : 'bg-white text-black border-gray-200 hover:bg-blue-100'
                } ${doctorUpdatedSlots.includes(slot) ? 'border-blue-500' : ''}`}
              >
                {slot}
              </button>
              {(bookedSlots.includes(slot) || doctorUpdatedSlots.includes(slot)) && <Tooltip id={slot} />}
            </div>
          ))}
        </div>
      </div>
      {selectedSlots.length > 0 && (
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Submit
        </button>
      )}
        {/* {deselectedSlots.length > 0 && (
        <button
          onClick={handledeselect}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Deselect
        </button>
      )} */}
    </div>
  );
}

export default SlotManage;
