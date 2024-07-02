import React, { useEffect, useState } from 'react';
import { fetchappointment_dashboard } from '../../../Services/Doctor/doctorService';
import { useSelector } from 'react-redux';
import LineChart from './LineChart';
import BarChart from './BarChart';

function Dashboard() {
  const Doctor = useSelector((state) => state.doctor.doctor);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetchappointment_dashboard(Doctor?._id);
        if (response.status === 200) {
          setAppointments(response.data);
          const uniquePatients = getUniquePatients(response.data);
          setPatients(uniquePatients);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (Doctor?._id) {
      fetchAppointments();
    }
  }, [Doctor?._id]);
  const getUniquePatients = (bookings) => {
    const patientsMap = {};
    bookings.forEach((booking) => {
      if (!patientsMap[booking.userId.email]) {
        patientsMap[booking.userId.email] = booking.userId;
      }
    });
    return Object.values(patientsMap);
  };

  const completedBookingsCount = appointments.filter(appointment => appointment.status === 'Completed').length;
 const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="container mx-auto py-8 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <LineChart appointments={appointments}/>
        </div>
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <h2 className="text-lg font-semibold text-white">{}</h2>
          <BarChart appointments={appointments}/>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <h2 className="text-lg font-semibold text-white">Consulted Patients</h2>
          <ul className="text-white overflow-y-auto" style={{ maxHeight: '200px' }}>
            {patients.map((patient) => (
              <li key={patient._id} className="border-b border-gray-700 py-1">{patient.name}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <h2 className="text-lg font-semibold text-white">Latest Appointments</h2>
          <ul className="text-white overflow-y-auto" style={{ maxHeight: '200px' }}>
            {sortedAppointments.map((appointment) => (
              <li key={appointment._id} className="border-b border-gray-700 py-1">
                {new Date(appointment.date).toLocaleDateString()} -- {appointment.userId.name} -- {appointment.shift}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg flex items-center justify-center">
          <div className="text-white text-center text-2xl">
            Completed Bookings: {completedBookingsCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
