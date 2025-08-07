import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler, 
} from "chart.js";

// ✅ Register Filler plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function SalesChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Weekly Problem Solve",
        data: [10, 20, 30, 50, 70, 90, 100],
        borderColor: "#FBBF24",
        backgroundColor: "rgba(251, 191, 36, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#E5E7EB",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#D1D5DB",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#D1D5DB",
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  return (
    <div className="rounded-xl p-5 shadow-lg bg-gradient-to-br from-[#360058] via-[#0C0415] to-black">
      <h3 className="text-xl font-semibold text-white mb-4">Problem Tracking</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default SalesChart;
