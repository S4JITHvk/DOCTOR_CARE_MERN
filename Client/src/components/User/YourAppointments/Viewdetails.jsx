import React from "react";

const Viewdetails = ({ show, onClose, appointment, formatDate }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3 transform transition-all duration-300 ease-out">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-700">
            {appointment.status === "Cancelled"
              ? "Appointment Cancelled"
              : "Appointment Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        {appointment.payment?.status === "Refunded" ? (
          <div className="text-center text-gray-700">
            Your payment of ₹499 has been refunded. Please check your account.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {appointment.status === "Cancelled" ? (
              <div className="text-center text-gray-700">
                Your appointment with Dr. {appointment.doctorName} on{" "}
                {formatDate(appointment.date)} at {appointment.shift} has been
                cancelled due to some emergency. Your amount of ₹499 will be
                credited to your Acoount back with in 7working days after admin
                verification.
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Doctor Name:
                  </span>
                  <span className="text-gray-900">
                    Dr. {appointment.doctorName}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Expertise:
                  </span>
                  <span className="text-gray-900">{appointment.expertise}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Experience:
                  </span>
                  <span className="text-gray-900">
                    {appointment.experience} Years
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Gender:
                  </span>
                  <span className="text-gray-900">{appointment.gender}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Booking Date:
                  </span>
                  <span className="text-gray-900">
                    {formatDate(appointment.date)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Status:
                  </span>
                  <span
                    className={`text-gray-900 ${
                      appointment.status === "Active"
                        ? "text-blue-500"
                        : appointment.status === "Cancelled"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {appointment.status === "Active"
                      ? "Upcoming"
                      : appointment.status === "Cancelled"
                      ? "Cancelled"
                      : "Completed"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">
                    Scheduled on:
                  </span>
                  <span className="text-gray-900">{appointment.shift}</span>
                </div>
              </>
            )}
          </div>
        )}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
