import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { asyncLogout } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Nav = () => {
  const [profileView, setProfileView] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, accessToken } = useSelector((state) => state.user);
  const isAuthenticated = user && accessToken;

  // Scroll hide/reveal navbar
  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileView(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/problems", label: "Problems" },
    { path: "/interview", label: "Interview" },
    { path: "/resumereviewer", label: "Resume Reviewer" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="h-14 flex items-center">
          <img src={logo} alt="logo" className="h-full w-auto object-contain" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium backdrop-blur-sm bg-white/5 px-6 py-2 rounded-xl border border-white/10 shadow-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-[radial-gradient(ellipse_at_center_bottom,_#FF5CA0,_#8C3EC1_60%)] text-white font-semibold rounded-full shadow-md hover:opacity-90 transition py-1 px-3"
                  : "hover:text-[#8C3EC1] transition"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white text-3xl cursor-pointer" onClick={() => setMobileMenu(true)}>
          <HiMenuAlt3 />
        </div>

        {/* Auth / Profile Desktop */}
        <div className="hidden md:flex items-center gap-2 relative">
          {!isAuthenticated ? (
            <>
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <div
                onClick={() => setProfileView((prev) => !prev)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 bg-[#0C0414]/60 backdrop-blur-md hover:bg-[#310050]/70 group shadow-md hover:shadow-purple-800 border border-transparent hover:border-purple-500"
              >
                <FaUserAlt className="text-white text-lg group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white font-bold tracking-wide text-base group-hover:underline">
                  {user?.fullName}
                </span>
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {profileView && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0C0414]/80 backdrop-blur-md shadow-lg border border-white/10 overflow-hidden"
                  >
                    <div className="p-6 flex flex-col items-center text-center bg-gradient-to-br from-[#160025] to-[#2b0d3d] border-b border-white/10">
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                      />
                      <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                      <p className="text-gray-300 text-sm mt-1">{user.email}</p>
                      <span className="mt-3 inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
                        {user.role}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <Link
                        to={"/dashboard"}
                        className="px-5 py-3 text-white hover:bg-purple-700/30 transition"
                      >
                        {user?.role === "admin" ? "Dashboard" : "Profile"}
                      </Link>
                      <button
                        onClick={() => dispatch(asyncLogout(navigate))}
                        className="px-5 py-3 text-red-400 hover:bg-red-500/20 transition text-left"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-screen bg-[#0C0414] z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <img src={logo} alt="logo" className="h-12" />
              <HiX
                className="text-white text-3xl cursor-pointer"
                onClick={() => setMobileMenu(false)}
              />
            </div>

            <div className="flex flex-col gap-6 text-lg text-white">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    isActive ? "text-pink-500 font-bold" : "hover:text-pink-400"
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/10">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <Button onClick={() => navigate("/login")}>Login</Button>
                  <Button onClick={() => navigate("/register")}>Sign Up</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-4"
                  />
                  <h2 className="text-xl font-bold text-white">{user.fullName}</h2>
                  <p className="text-gray-300 text-sm">{user.email}</p>
                  <span className="mt-2 inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {user.role}
                  </span>
                  <Link
                    to={user?.role === "admin" ? "/dashboard" : "/profile"}
                    onClick={() => setMobileMenu(false)}
                    className="mt-4 text-pink-400"
                  >
                    {user?.role === "admin" ? "Dashboard" : "Profile"}
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(asyncLogout(navigate));
                      setMobileMenu(false);
                    }}
                    className="mt-4 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
