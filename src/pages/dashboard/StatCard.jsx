import React from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

function StatCard({ title, value, change, status, icon }) {
  const isUp = status === "up";

  return (
    <div className="bg-gradient-to-br from-[#360058] via-[#0C0415] to-black text-white p-6 rounded-2xl shadow-lg flex justify-between items-center transition-all hover:scale-[1.015] hover:shadow-2xl duration-300">
      {/* Left Side: Text */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 tracking-wide">{title}</h4>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <div className="flex items-center mt-2 text-sm">
          {isUp ? (
            <FiArrowUpRight className="text-green-400 mr-1" />
          ) : (
            <FiArrowDownRight className="text-red-400 mr-1" />
          )}
          <span className={isUp ? "text-green-400" : "text-red-400"}>
            {change}
            <span className="ml-1 text-gray-400">Since last week</span>
          </span>
        </div>
      </div>

      {/* Right Side: Icon */}
      <div className="text-4xl bg-white/10 p-3 rounded-xl text-white">
        {icon || "📊"}
      </div>
    </div>
  );
}

export default StatCard;
