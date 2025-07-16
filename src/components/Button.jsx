import React from "react";

function Button({ children, onClick, type = "button", className }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={` px-3 py-1 ${className} bg-[radial-gradient(ellipse_at_center_bottom,_#FF5CA0,_#8C3EC1_60%)] text-white font-semibold  rounded-full shadow-md hover:opacity-90 transition`}
    >
      {children}
    </button>
  );
}

export default Button;
