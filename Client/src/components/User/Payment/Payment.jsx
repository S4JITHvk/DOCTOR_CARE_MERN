import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../API/DoctorCareApi";
import { loadStripe } from '@stripe/stripe-js';
import { addAppointment, removeAppointment } from "../../../ReduxStore/features/appointmentSlice";
import {payment_checkoutsession} from "../../../Services/User/userService"
const stripePromise = loadStripe('pk_test_51PLmMyKj3ZW2TL11Wyt4ze8kj2I1yk3a6PKrYHdRq9sfwloK1RjFhClqDUEKGxwB8Cv3Sc78itTbjUdjHfOrVn8W009leKwMga');

function PaymentProcess() {
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedDoctor, selectedDate, selectedShift } = location.state;
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("online");
  const appointments = useSelector((state) => state.appointments?.appointments);

  const renderFacilities = () => {
    return (
      <ul className="list-disc pl-5">
        <li>Video Call Consultation</li>
        <li>Chat Support</li>
        <li>Call with Experienced Doctor</li>
        <li>Share your feelings and problems</li>
      </ul>
    );
  };

  useEffect(() => {
    const userAppointment = appointments?.appointments?.find(appointment => appointment.userId === User.user._id);
    dispatch(removeAppointment({ appointments, userAppointment }));
  }, []);

  const handlePaymentOptionSelect = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleProceed = async () => {
      const existingAppointment = appointments?.find(appointment => appointment?.userId === User.user._id);
      if (existingAppointment) {
        alert("The slot is already booked. Please select another slot.");
        return;
      }
      const data = {
        doctorId: selectedDoctor._id,
        userId: User.user._id,
        date: selectedDate.toISOString().split('T')[0],
        shift: selectedShift,
      }
      await dispatch(addAppointment(data));
      if (selectedPaymentOption === 'online') {
        const data={
          doctorId: selectedDoctor._id,
          userId: User.user._id,
          date: selectedDate.toISOString().split('T')[0],
          shift: selectedShift,
        }
        const sessionResponse = await payment_checkoutsession(data)
        const sessionId = sessionResponse.data.session.url;
        window.location.href = sessionId;
      } else {
        console.log("redirecting to wallet");
      }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col justify-between h-full">
      <h2 className="text-3xl font-semibold mb-4 text-blue-800">Confirm Booking</h2>
      <div className="bg-white rounded-lg shadow-lg p-8 flex justify-between flex-wrap">
        <div className="w-1/2">
          <div className=" w-full mb-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Doctor Details</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> DR {selectedDoctor?.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Experience:</span>{" "}
              {selectedDoctor?.experience_years} years
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Expertise:</span>{" "}
              {selectedDoctor?.expertise}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Appointment Details</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span>{" "}
              {selectedDate?.toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Time:</span>{" "}
              {selectedShift}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Payment Details</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Amount:</span> $499
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Facilities Provided</h3>
            {renderFacilities()}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img src="/assets/check1.jpg" alt="Image 1" className="w-[350px] h-[200px] mb-6 hidden md:block" />
          <img src="/assets/check2.jpg" alt="Image 3" className="w-[350px] h-[200px] hidden md:block" />
        </div>
        <div className="w-full flex items-center justify-center">
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      onClick={() => setShowModal(true)}
    >
      Proceed to Payment
    </button>
  </div>
      </div>
      

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Select Payment Option</h2>
           
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="online"
                  checked={selectedPaymentOption === "online"}
                  onChange={() => handlePaymentOptionSelect("online")}
                />
                Pay Online
              </label>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className={`px-4 py-2 ${selectedPaymentOption ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white rounded`}
                onClick={handleProceed}
                disabled={!selectedPaymentOption}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentProcess;
