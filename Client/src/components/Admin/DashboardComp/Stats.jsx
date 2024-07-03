import React, { useEffect, useState } from "react";
import { fetch_allbookinglist } from "../../../Services/Admin/adminService";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Doctorstats from "./Doctors";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPossibleIncome, setTotalPossibleIncome] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch_allbookinglist();
        if (response.status === 200) {
          setAppointments(response.data.bookings);
          const uniquePatients = getUniquePatients(response.data.bookings);
          setPatients(uniquePatients);
          calculateTotalIncome(response.data.bookings);
          calculateTotalPossibleIncome(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const getUniquePatients = (bookings) => {
    const patientsMap = {};
    bookings.forEach((booking) => {
      if (!patientsMap[booking.userId.email]) {
        patientsMap[booking.userId.email] = booking.userId;
      }
    });
    return Object.values(patientsMap);
  };

  const sortedAppointments = [...appointments]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 10);


  const calculateTotalIncome = (bookings) => {
    const totalIncomeAmount = bookings.reduce((total, booking) => {
      if (booking.payment.status === "Paid") {
        return total + 499;
      }
      return total;
    }, 0);
    setTotalIncome(totalIncomeAmount);
  };
  const calculateTotalPossibleIncome = (bookings) => {
    const possibleIncome = bookings.length * 499;
    setTotalPossibleIncome(possibleIncome);
  };
  const percentageOfTotalIncome =
    totalPossibleIncome !== 0
      ? ((totalIncome / totalPossibleIncome) * 100).toFixed(2)
      : 0;
  return (
    <div className="container mx-auto py-6 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <LineChart appointments={appointments} />
        </div>
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <BarChart appointments={appointments} />
        </div>
      </div>

      <Doctorstats Appointments={appointments} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <h2 className="text-lg font-semibold text-white">
            Consulted Patients
          </h2>
          <ul
            className="text-white overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            {patients.map((patient) => (
                <div className="flex mt-2">
                  <img
                  src={patient.profile || '/assets/user.png'} 
                  alt={`${patient.name}'s profile`}
                  className="w-8 h-8 rounded-full mr-2"
                />
              <li key={patient._id} className="border-b border-gray-700 py-1">
                {patient.name}
              </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg">
          <h2 className="text-lg font-semibold text-white">
            Latest Appointments
          </h2>
          <ul
            className="text-white overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            {sortedAppointments.map((appointment) => (
              <li
                key={appointment._id}
                className="border-b border-gray-700 py-1 text-sm"
              >
                {new Date(appointment.date).toLocaleDateString()} -{" "}
                {appointment.userId.name} with DR {appointment.doctorId.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-4 border border-gray-600 rounded-lg flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-white">Total Income</h2>
          <div className="text-white text-2xl mt-4">{totalIncome} INR</div>
          <div className="text-gray-400 text-sm mt-2">
            Percentage of total: {percentageOfTotalIncome}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
