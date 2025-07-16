import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import  Button  from "../components/Button";
import { asyncLogout } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

const Nav = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setShowNavbar(false); // scrolling down
    } else {
      setShowNavbar(true); // scrolling up
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);



  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4  transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="h-10 ">
          <img src={logo} alt="logo" className="h-full w-full object-contain" />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6  font-medium backdrop-blur-sm  bg-white/5 px-6 py-2 rounded-xl border border-white/10 shadow-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[radial-gradient(ellipse_at_center_bottom,_#FF5CA0,_#8C3EC1_60%)]  font-semibold  rounded-full shadow-md hover:opacity-90 transition py-1 px-2"
                : "hover:text-[#8C3EC1] transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/problems"
            className={({ isActive }) =>
              isActive
                ? "text-[#8C3EC1] font-semibold"
                : "hover:text-[#8C3EC1] transition"
            }
          >
            Problems
          </NavLink>
          <NavLink
            to="/interview"
            className={({ isActive }) =>
              isActive
                ? "text-[#8C3EC1] font-semibold"
                : "hover:text-[#8C3EC1] transition"
            }
          >
            Interview
          </NavLink>
          <NavLink
            to="/resumereviewer"
            className={({ isActive }) =>
              isActive
                ? "text-[#8C3EC1] font-semibold"
                : "hover:text-[#8C3EC1] transition"
            }
          >
            Resume Reviewer
          </NavLink>
        </nav>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button onClick={()=>navigate("/login")}>Login</Button>
          <Button onClick={()=>navigate("/register")}>Sign Up</Button>
          <Button onClick={()=>dispatch(asyncLogout(navigate))}>Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
