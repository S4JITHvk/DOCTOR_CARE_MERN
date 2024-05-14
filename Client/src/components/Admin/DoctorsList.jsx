import React, { useState, useEffect } from 'react';
import Api from '../../API/DoctorCareApi';
function DoctorsList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api('/admin/doctorlist');
        if (response.status === 200) {
          setList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
      fetchData();
    
   
  }, []);

 const blockDoctor=()=>{

 }


  if (isLoading) {
    return <><h1>Fetching Doctors...</h1></>;
  }

  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-37 mr-20 mt-45">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 ml-5">Doctor Approvals</h1>
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Joined
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Medical License No
            </th>
            <th scope="col" className="px-6 py-3">
              Expertise
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Ban/Unban
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((list) => (
             <tr key={list._id}>
              <td className="p-4">{list.name}</td>
              <td className="px-6 py-4">{list.email}</td>
              <td className="px-6 py-4">{new Date(list.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                {list.is_verified ? 'Inactive' : 'Active'}
             </td>
             <td className="px-6 py-4">
                {list.medical_license_no}
             </td>
             <td className="px-6 py-4">
                {list.expertise}
             </td>
             <td className="px-6 py-4">
                {list.gender}
             </td>
              <td className="px-6 py-4">
                <button
                  className={`py-2 px-4 rounded bg-red-500 text-white `}
                  style={{ width: '100px' }} 
                  onClick={() => blockDoctor(list.id)}
                >
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default DoctorsList;
