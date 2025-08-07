import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function InvoiceChart() {
  const data = {
    labels: ["Total", "Solved", "Available"],
    datasets: [
      {
        label: "Invoices",
        data: [60, 25, 15],
        backgroundColor: ["#FBBF24", "#34D399", "#EF4444"], // Yellow, Green, Red
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#E5E7EB", // Tailwind gray-200
        },
      },
    },
  };

  return (
    <div className="rounded-xl p-5 shadow-lg bg-gradient-to-br from-[#360058] via-[#0C0415] to-black">
      <h3 className="text-xl font-semibold text-white mb-6">Invoice Status</h3>
      <div className="">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}

export default InvoiceChart;
