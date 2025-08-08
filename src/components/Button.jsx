import React from "react";

function Button({ children, onClick, type = "button", className }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        relative px-3 py-1 rounded-full font-semibold text-white overflow-hidden
        bg-gradient-to-r from-[#FF5CA0] via-[#A64AC9] to-[#8C3EC1]
        shadow-lg shadow-[#FF5CA060]
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-[#FF5CA090]
        ${className}
      `}
    >
      {/* Glow Layer */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#FF5CA0] via-[#FF7BB4] to-[#8C3EC1] opacity-0 blur-xl transition-opacity duration-300 hover:opacity-50"></span>

      {/* Glass Overlay */}
      <span className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm"></span>

      {/* Text */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default Button;
