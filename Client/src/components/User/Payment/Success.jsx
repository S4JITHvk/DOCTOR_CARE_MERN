import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeAppointment } from "../../../ReduxStore/features/appointmentSlice";

function Success() {
  const appointments = useSelector((state) => state.appointments);
  const User = useSelector((state) => state.user);
  const userId = User.user?._id;
  const dispatch = useDispatch();
  useEffect(() => {
    const handleBooking = async () => {
      if (userId && appointments.appointments.length > 0) {
        const userAppointment = appointments.appointments.find(appointment => appointment.userId === userId);
        if (userAppointment) {
          try {
              dispatch(removeAppointment({ appointments, userAppointment }));
          } catch (error) {
            console.error('Error making API request:', error);
          }
        }
      }
    };
    handleBooking();
  }, [userId, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
        </div>
        <div className="text-green-500 text-center text-6xl mb-6">
        &#10004;
      </div>
        <div className="flex flex-col items-center">   
          <p className="mt-2 text-lg text-gray-500">
            Your payment has been processed successfully.
          </p>
        </div>
        <div className="mt-5 md:mt-6 flex justify-center">
          <span className="relative inline-flex position-center rounded-md shadow-sm">
            <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
             Back to Home
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Success;
