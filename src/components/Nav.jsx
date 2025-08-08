import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { asyncLogout } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import {motion} from "framer-motion"
const Nav = () => {
  const [profileView, setProfileView] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, accessToken } = useSelector((state) => state.user);

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

  const isAuthenticated = user && accessToken;

  return (
    <header
      className={`fixed  top-0 left-0 w-full z-50 px-6 py-4 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="h-15">
          <img src={logo} alt="logo" className="h-full w-full object-contain" />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 font-medium backdrop-blur-sm bg-white/5 px-6 py-2 rounded-xl border border-white/10 shadow-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[radial-gradient(ellipse_at_center_bottom,_#FF5CA0,_#8C3EC1_60%)] font-semibold rounded-full shadow-md hover:opacity-90 transition py-1 px-2"
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

        {/* Auth Buttons */}
        <div className="flex gap-2">
          {!isAuthenticated && (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </>
          )}
        </div>
        {isAuthenticated && (
          <div className="absolute top-[25%] right-10 z-50">
            <div
              onClick={() => setProfileView(!profileView)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 bg-[#0C0414]/60 backdrop-blur-md hover:bg-[#310050]/70 group shadow-md hover:shadow-purple-800 border border-transparent hover:border-purple-500"
            >
              <FaUserAlt className="text-white text-lg group-hover:scale-110 transition-all duration-300 ease-in-out" />
              <span className="text-white font-bold tracking-wide text-base transition-all duration-300 ease-in-out hover:underline">
                {user?.fullName}
              </span>
              <svg
                className={`w-4 h-4 text-white transition-transform duration-300 ${
                  profileView ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            <div
              className={`mt-2 rounded-xl bg-[#0C0414]/80 backdrop-blur-md shadow-lg transition-all duration-300 transform origin-top ${
                profileView
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-col px-4 py-3 gap-2">
                <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl shadow-lg max-w-sm w-full mx-auto flex flex-col items-center text-center cursor-pointer group"
              style={{
                background: "linear-gradient(145deg, #160025, #2b0d3d)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Avatar */}
              <motion.img
                src={user.avatar}
                alt={user.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4 group-hover:border-pink-400 transition-all duration-300"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Name */}
              <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                {user.fullName}
              </h2>

              {/* Email */}
              <p className="text-gray-300 text-sm mt-1">{user.email}</p>

              {/* Role Badge */}
              <span className="mt-3 inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
                {user.role}
              </span>
            </motion.div>
                <button
                  className="text-white font-semibold  transition duration-300 text-left"
                  onClick={() => {
                    // navigate to profile page
                  }}
                >
                  <Link to={"/dashboard"}>{user?.role==="admin"?"Dashboard":"Profile"}</Link>
                
               
                </button>
                <button
                  className="text-red-500 hover:text-red-400 font-semibold transition duration-300 text-left"
                  onClick={() => dispatch(asyncLogout(navigate))}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
