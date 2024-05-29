import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Api from "../../API/DoctorCareApi"
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
function PaymentProcess() {
  const location = useLocation();
  const { selectedDoctor, selectedDate, selectedShift } = location.state;
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");


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

  const handlePaymentOptionSelect = (option) => {
    setSelectedPaymentOption(option);
  };
  const handleProceed = async() => {
   try{
    const response = await Api.get("/check-slot", {
        doctorId: selectedDoctor.id,
        date: selectedDate,
        shift: selectedShift,
      });
      if (response.status===200) {
        console.log("Slot is available, proceed with payment");
        if(selectedPaymentOption==='online'){

        }else{
            console.log("redirecting to wallet")
        }
      } else {
        setError("Selected slot is not available. Please choose a different time.");
      }
   }catch(e){
    console.log(e.message)
   }

  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4 text-blue-800">Confirm Booking</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-4">
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
        <div className="flex justify-center">
          <button
            className="px-4 py-2 mr-5 mb-5 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      {/* Payment Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Select Payment Option</h2>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="wallet"
                  checked={selectedPaymentOption === "wallet"}
                  onChange={() => handlePaymentOptionSelect("wallet")}
                />
                Pay from Wallet
              </label>
            </div>
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
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
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
