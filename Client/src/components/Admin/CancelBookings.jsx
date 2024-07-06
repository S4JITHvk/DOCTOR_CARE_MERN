import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Swal from 'sweetalert2';
import {cancel_booking,fetchcancelled_booking} from "../../Services/Admin/adminService"
function CancelBookings() {
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [refundInitiated, setRefundInitiated] = useState({});
  const fetchCancelledBookings = async () => {
      const response = await  fetchcancelled_booking(page,limit)
      if(response.status===200){
      setCancelledBookings(response.data.cancelledBookings);
      setTotalPages(response.data.totalPages);
      setLoading(false);
      }
  };
  useEffect(() => {
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

  const handleDoneClick = async (bookingId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark as done!'
    }).then(async (result) => { 
      if (result.isConfirmed) {
        try {
          const response = await cancel_booking(bookingId); 
          if (response.status===200) {
            fetchCancelledBookings();
            setRefundInitiated(prevState => ({
              ...prevState,
              [bookingId]: true 
            }));
            Swal.fire(
              'Done!',
              'Booking has been marked as done.',
              'success'
            );
          }
        } catch (error) {
          console.error('There was an error!', error);
          Swal.fire(
            'Error!',
            'There was an issue marking the booking as done.',
            'error'
          );
        }
      }
    });
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
                <th className="py-2 px-4 border-b">Doctor</th>
                <th className="py-2 px-4 border-b">Booking Date</th>
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
                  <td className="py-2 px-4 border-b">{booking.doctorDetails.name}</td>
                  <td className="py-2 px-4 border-b">{new Date(booking.date).toISOString().split('T')[0]}</td>
                  <td className="py-2 px-4 border-b">{booking.userDetails.name}</td>
                  <td className="py-2 px-4 border-b">{booking.status}</td>
                  <td className="py-2 px-4 border-b">$499</td>
                  <td className="py-2 px-4 border-b">{booking.payment.paymentId}</td>
                  <td className="py-2 px-4 border-b">Emergency</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDoneClick(booking._id)} 
                        disabled={refundInitiated[booking._id]} 
                        className={`px-2 py-1 ${refundInitiated[booking._id] ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-white rounded`}
                      >
                        Refund
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
