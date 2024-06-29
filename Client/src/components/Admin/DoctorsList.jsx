import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast"
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import Swal from 'sweetalert2';
import {fetch_doctorlist,doctorban,doctorSoftdelete} from "../../Services/Admin/adminService"
function DoctorsList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const fetchData = async () => {
      const response = await fetch_doctorlist()
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
    if (pageNumber === 'prev') {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (pageNumber === 'next') {
      setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredList.length / itemsPerPage)));
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const blockDoctor =async (id) => {
      const response = await doctorban(id)
      if (response.status === 200) {
        fetchData();
        toast.success(response.data.message);
      } else {
        console.log('Failed to ban user');
      }
  };
  const handleDelete = async (id) => {
    try {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            const response = await doctorSoftdelete(id);
            if (response.status === 200) {
                fetchData();
                toast.success(response.data.message);
                Swal.fire(
                    'Deleted!',
                    'The Doctor has been deleted.',
                    'success'
                );
            } else {
                console.log('Failed to delete doctor');
            }
        }
    } catch (err) {
        console.log(err.message);
    }
}

  if (isLoading) {
    return <><h1>Fetching Doctors...</h1></>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
      <h1 className="text-3xl font-bold mb-4">Doctor List</h1>
      <div className="flex items-center justify-between flex-wrap bg-white dark:bg-gray-900 p-2 rounded-lg">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-2">Name</th>
            <th scope="col" className="px-4 py-2">Email</th>
            <th scope="col" className="px-4 py-2">Joined</th>
            <th scope="col" className="px-4 py-2">Status</th>
            <th scope="col" className="px-4 py-2">Medical License No</th>
            <th scope="col" className="px-4 py-2">Expertise</th>
            <th scope="col" className="px-4 py-2">Gender</th>
            <th scope="col" className="px-4 py-2">Ban/Unban</th>
            {/* <th scope="col" className="px-4 py-2">Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item._id}>
              <td className="p-2">{item.name}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">{item.is_banned ? 'Inactive' : 'Active'}</td>
              <td className="px-4 py-2">{item.medical_license_no}</td>
              <td className="px-4 py-2">{item.expertise}</td>
              <td className="px-4 py-2">{item.gender}</td>
              <td className="px-4 py-2">
              <button
                  className={`py-1 px-3 rounded ${item.is_banned ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  onClick={() => blockDoctor(item._id)}
                  style={{ width: '80px' }} 
                >
                  {item.is_banned ? 'Unblock' : 'Block'}
                </button>
              </td>
              {/* <td className="px-4 py-2">
                <button
                  className={`py-1 px-3 rounded bg-blue-500 text-white`}
                  onClick={() => handleDelete(item._id)}
                  style={{ width: '80px' }} 
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center ">
        <button
          onClick={() => paginate('prev')}
          className={`px-2 py-1 mx-1 rounded bg-blue-500 text-white border border-gray-300`}
          disabled={currentPage === 1}
        >
         <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        {[...Array(Math.min(3, Math.ceil(filteredList.length / itemsPerPage))).keys()].map((index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-2 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} border border-gray-300`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate('next')}
          className={`px-2 py-1 mx-1 rounded bg-blue-500 text-white border border-gray-300`}
          disabled={currentPage === Math.ceil(filteredList.length / itemsPerPage)}
        >
          <MdOutlineKeyboardDoubleArrowRight/>
        </button>
      </div>
    </div>
  );
}

export default DoctorsList;
