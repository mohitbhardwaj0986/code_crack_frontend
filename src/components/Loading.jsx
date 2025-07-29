import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-[#8C3EC1] animate-spin"></div>
      </div>
      <h2 className="text-white text-xl font-semibold animate-pulse tracking-wide">
        Loading, please wait...
      </h2>
    </div>
  );
}

export default Loading;
