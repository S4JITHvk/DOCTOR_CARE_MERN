import React, { useEffect, useState } from 'react';
import Api from '../../API/DoctorCareApi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterDate, setFilterDate] = useState(new Date())
  const [searchDoctor, setSearchDoctor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [currentPage, filterDate, searchDoctor]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await Api.get('/admin/bookingList', {
        params: {
          page: currentPage,
          date: filterDate ? filterDate?.toISOString().split('T')[0] : '',
          doctorName: searchDoctor,
        },
      });
      setBookings(response.data.bookings);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setFilterDate(date);
  };

  const viewBooking = (bookingId) => {
    const booking = bookings.find((b) => b._id === bookingId);
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Booking List</h1>
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center">
          <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700">
            Filter by Date:
          </label>
          <DatePicker
            selected={filterDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="searchDoctor" className="block text-sm font-medium text-gray-700">
            Search by Doctor Name:
          </label>
          <input
            type="text"
            id="searchDoctor"
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Doctor License No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Patient Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.doctorId.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.doctorId.medical_license_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.userId.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.userId.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.shift}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewBooking(booking._id)}
                      className="bg-green-500 text-white hover:bg-green-700 focus:outline-none px-2 py-1 rounded-md"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 focus:outline-none"
        >
          Previous
        </button>
        <span className="text-lg text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 focus:outline-none"
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Booking Details"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
          {selectedBooking && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
              <p><strong>Doctor Name:</strong> {selectedBooking.doctorId.name}</p>
              <p><strong>Doctor License No:</strong> {selectedBooking.doctorId.medical_license_no}</p>
              <p><strong>Doctor Gender:</strong> {selectedBooking.doctorId.gender}</p>
              <p><strong>Doctor Expertise in:</strong> {selectedBooking.doctorId.expertise}</p>
              <p><strong>Doctor Working Experience:</strong> {selectedBooking.doctorId.experience_years} years</p>
              <p><strong>Patient Name:</strong> {selectedBooking.userId.name}</p>
              <p><strong>Patient Email:</strong> {selectedBooking.userId.email}</p>
              <p><strong>Scheduled Date:</strong> {new Date(selectedBooking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedBooking.shift}</p>
             
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default BookingList;
