import React, { useEffect, useState } from 'react';
import Api from '../../API/DoctorCareApi';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function CancelBookings() {
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchCancelledBookings = async () => {
      try {
        const response = await Api.get(`/admin/cancelled-bookings?page=${page}&limit=${limit}`);
        console.log(response.data,"==>")
        setCancelledBookings(response.data.cancelledBookings);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cancelled bookings:', error);
        setLoading(false);
      }
    };

    fetchCancelledBookings();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDoneClick = (bookingId) => {
    // Implement the logic for marking the booking as done
    console.log(`Booking ${bookingId} marked as done.`);
  };

  const handleViewClick = (bookingId) => {
    // Implement the logic for viewing booking details
    console.log(`Viewing details for booking ${bookingId}.`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cancelled Bookings</h1>
      {cancelledBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
              
                <th className="py-2 px-4 border-b">Booking Date</th>
                <th className="py-2 px-4 border-b">Doctor</th>
                <th className="py-2 px-4 border-b">Patient</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Payment ID</th>
                <th className="py-2 px-4 border-b">Reason</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cancelledBookings.map(booking => (
                <tr key={booking._id}>
                  <td className="py-2 px-4 border-b">{new Date(booking.date).toISOString().split('T')[0]}</td>
                  <td className="py-2 px-4 border-b">{booking.doctorDetails.name}</td>
                  <td className="py-2 px-4 border-b">{booking.userDetails.name}</td>
                  <td className="py-2 px-4 border-b">{booking.status}</td>
                  <td className="py-2 px-4 border-b">$499</td>
                  <td className="py-2 px-4 border-b">{booking.payment.paymentId}</td>
                  <td className="py-2 px-4 border-b">Emergency</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDoneClick(booking._id)} 
                        className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white rounded"
                      >
                        Done
                      </button>
                      <button 
                        onClick={() => handleViewClick(booking._id)} 
                        className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No cancelled bookings found.</p>
      )}
      <div className="flex justify-center mt-4 items-center">
        <button 
          onClick={handlePreviousPage} 
          disabled={page === 1} 
          className={`px-4 py-2 mx-1 ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <span className="px-4 py-2 text-gray-700">{`Page ${page} of ${totalPages}`}</span>
        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages} 
          className={`px-4 py-2 mx-1 ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}

export default CancelBookings;
