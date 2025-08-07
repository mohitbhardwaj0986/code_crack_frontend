import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0414] text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-center space-y-6"
      >
        {/* Glitch 404 */}
        <h1 className="text-7xl sm:text-9xl font-extrabold text-[#310050] relative inline-block glitch">
          404
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300">Oops! Page Not Found.</p>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          The page you're looking for doesn’t exist or might have been moved. Let’s get you back home.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 rounded-lg bg-[#310050] text-white font-medium hover:bg-purple-700 transition"
        >
          🔙 Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PageNotFound;
