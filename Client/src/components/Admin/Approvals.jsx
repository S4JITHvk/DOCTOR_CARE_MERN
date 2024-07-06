import React, { useState, useEffect } from "react";
import toast from "react-hot-toast"
import Swal from 'sweetalert2';
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import {fetchdoctor_approvalist,verify_doctor} from "../../Services/Admin/adminService"
function Modal({ isVisible, onClose, doctor }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Doctor Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">
                Personal Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Name:</strong> {doctor.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Email:</strong> {doctor.email}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Phone No:</strong> {doctor.phone_number}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Joined:</strong>{" "}
                {new Date(doctor.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Gender:</strong> {doctor.gender}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">
                Professional Details
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Medical License No:</strong> {doctor.medical_license_no}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Expertise:</strong> {doctor.expertise}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Experience:</strong> {doctor.experience_years} Years
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Working Hospital:</strong> {doctor.working_Hospital}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Hospital Contact:</strong> {doctor.working_Hospital_contact}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          
          <button
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Approvals() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchData = async () => {
      const response = await fetchdoctor_approvalist()
      if (response.status === 200) {
        setList(response.data.data);
        setIsLoading(false);
      }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (pageNumber === "next") {
      setCurrentPage((prev) =>
        Math.min(prev + 1, Math.ceil(filteredList.length / itemsPerPage))
      );
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const viewList = (doctorId) => {
    const doctor = list.find((item) => item._id === doctorId);
    setSelectedDoctor(doctor);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedDoctor(null);
  };
  const verifyDoctor = async (doctorid) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Approve this profile .",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Approve!"
      });
      if (result.isConfirmed) {
        const response = await verify_doctor(doctorid)
      if (response.status === 200) {
        toast.success("Doctor verified successfully");
         fetchData()
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <h1>Fetching Lists...</h1>
      </>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <h1 className="text-3xl font-bold mb-4">Doctor Approvals</h1>
      {list.length > 0 ? (
        <div className="flex items-center justify-between flex-wrap bg-white dark:bg-gray-900 p-2 rounded-lg">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-1 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      ) : (
        <p className="text-center">No Approvals found.</p>
      )}
      {list.length > 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-2">Name</th>
              <th scope="col" className="px-4 py-2">Email</th>
              <th scope="col" className="px-4 py-2">Joined</th>
              <th scope="col" className="px-4 py-2">Status</th>
              <th scope="col" className="px-4 py-2">Medical License No</th>
              <th scope="col" className="px-4 py-2">Expertise</th>
              <th scope="col" className="px-4 py-2">View</th>
              <th scope="col" className="px-4 py-2">Verify</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td className="p-2">{item.name}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{item.is_verified ? "Inactive" : "Active"}</td>
                <td className="px-4 py-2">{item.medical_license_no}</td>
                <td className="px-4 py-2">{item.expertise}</td>
                <td className="px-4 py-2">
                  <button
                    className="py-1 px-3 rounded bg-green-500 text-white"
                    style={{ width: "80px" }}
                    onClick={() => viewList(item._id)}
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="py-1 px-3 rounded bg-red-500 text-white"
                    style={{ width: "80px" }}
                    onClick={() => verifyDoctor(item._id)}
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate("prev")}
            className={`px-2 py-1 mx-1 rounded bg-blue-500 text-white border border-gray-300`}
            disabled={currentPage === 1}
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          {[
            ...Array(
              Math.min(3, Math.ceil(filteredList.length / itemsPerPage))
            ).keys(),
          ].map((index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-2 py-1 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } border border-gray-300`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate("next")}
            className={`px-2 py-1 mx-1 rounded bg-blue-500 text-white border border-gray-300`}
            disabled={currentPage === Math.ceil(filteredList.length / itemsPerPage)}
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        doctor={selectedDoctor}
      />
    </div>
  );
}

export default Approvals;
