import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
  const [viewType, setViewType] = useState("month");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = [
    ...new Set(
      appointments.map((appointment) =>
        new Date(appointment.date).getFullYear()
      )
    ),
  ].sort((a, b) => a - b);

  const appointmentsByYearMonth = {};
  const appointmentsByYear = {};
  appointments.forEach((appointment) => {
    const date = new Date(appointment.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    if (!appointmentsByYearMonth[year]) {
      appointmentsByYearMonth[year] = Array(12).fill(0);
    }
    appointmentsByYearMonth[year][month] += 1;

    if (!appointmentsByYear[year]) {
      appointmentsByYear[year] = 0;
    }
    appointmentsByYear[year] += 1;
  });

  const totalAppointmentsByMonth = Array(12).fill(0);
  Object.values(appointmentsByYearMonth).forEach((monthlyCounts) => {
    monthlyCounts.forEach((count, month) => {
      totalAppointmentsByMonth[month] += count;
    });
  });

  const monthDataset = {
    label: "Total Appointments by Month",
    data: totalAppointmentsByMonth,
    borderColor: "rgba(255, 99, 132, 0.8)",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    fill: false,
  };

  const data = {
    labels: viewType === "month" ? months : years,
    datasets:
      viewType === "month"
        ? [monthDataset]
        : [
            {
              label: "Total Appointments by Year",
              data: years.map((year) => appointmentsByYear[year]),
              borderColor: "rgba(75, 192, 192, 0.8)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: false,
            },
          ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (viewType === "year") {
              const year = context.label;
              return [`Year ${year}: ${context.raw} appointments`];
            } else {
              return `${months[context.dataIndex]}: ${
                context.raw
              } appointments`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: viewType === "month" ? "Months" : "Years",
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        title: {
          display: true,
          text: "Appointments",
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
  };

  return (
    <>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            viewType === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
          onClick={() => setViewType("month")}
        >
          Month-wise
        </button>
        <button
          className={`px-4 py-2 rounded ${
            viewType === "year"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
          onClick={() => setViewType("year")}
        >
          Year-wise
        </button>
      </div>
      <h2 className="text-xl mb-4 text-gray-300">
        Total Appointments by {viewType === "month" ? "Month" : "Year"}
      </h2>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
