import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncLogin } from "../store/actions/userAction";
import Button from "../components/Button";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    setLoading(true);
    dispatch(asyncLogin(data, navigate));
  };

  return (
    <div className="h-screen flex pt-10 items-center justify-center bg-gradient-to-br from-[#0a0015] via-[#120028] to-[#000] relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] bg-white/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient Glows */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/40 rounded-full blur-[180px] top-[15%] left-[8%]"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-[150px] bottom-[10%] right-[10%]"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-md p-10 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(138,43,226,0.4)]"
      >
        {/* Logo / Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full border border-purple-400 flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.4)]"
        >
          <svg
            className="w-10 h-10 text-purple-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 
              3.582-8 8 3.582 8 8 8zm-1-11h2v6h-2zm0 8h2v2h-2z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 transition-all"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-pink-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 transition-all"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-pink-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </motion.div>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-xs text-center mt-6">
          Don’t have an account?{" "}
          <span className="text-purple-400 hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
