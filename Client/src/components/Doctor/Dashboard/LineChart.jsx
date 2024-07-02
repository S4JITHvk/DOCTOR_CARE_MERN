import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ appointments }) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const appointmentsByMonth = Array(12).fill(0);

  appointments.forEach((appointment) => {
    const month = new Date(appointment.date).getMonth();
    appointmentsByMonth[month] += 1;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Total Appointments',
        data: appointmentsByMonth,
        borderColor: 'rgba(255, 73, 73, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
   <>
      <h2 className="text-xl mb-4 text-gray-300">
        Total Appointments by Month
      </h2>
      <Line data={data} options={options} />
      </>
  );
}

export default LineChart;
