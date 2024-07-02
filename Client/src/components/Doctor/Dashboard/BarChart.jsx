import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ appointments }) {
  console.log(appointments, '==>');

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
    }
    return days;
  };

  const filterDataByDate = (data, key, format) => {
    const last7Days = getLast7Days();
    return last7Days.map((date) => {
      let count = 0;

      data.forEach((item) => {
        const itemDate = moment(item[key]).format(format);

        if (itemDate === date) {
          count++;
        }
      });

      return count;
    });
  };

  const labels = getLast7Days().map((date) => moment(date).format('MM-DD'));
  const appointmentsData = filterDataByDate(appointments, 'date', 'YYYY-MM-DD');
  const data = {
    labels,
    datasets: [
      {
        label: 'Appointments',
        data: appointmentsData,
        backgroundColor: 'rgba(57, 89, 255, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
      <h2 className="text-xl mb-2 text-gray-300">
      Total Appointments by last week
      </h2>
      <div style={{ height: '250px' }}>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default BarChart;
