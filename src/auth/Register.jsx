import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { asyncRegister } from "../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    setLoading(true);
    dispatch(asyncRegister(data, navigate));
  };

  return (
    <div className="h-screen py-10  flex items-center justify-center bg-gradient-to-br from-[#05000A] via-[#0d0013] to-[#0a000b] relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute w-[500px] py-20 h-[500px] bg-gradient-to-r from-[#8C3EC1] to-[#1C0940] rounded-full blur-[160px] opacity-30 top-[15%] left-[5%] animate-pulse-slow"></div>
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-[#1C0940] to-[#8C3EC1] rounded-full blur-[140px] opacity-20 bottom-[10%] right-[10%] animate-pulse-slow"></div>

      {/* Card */}
      <div className="relative group  w-[90%] max-w-sm p-8 mt-10 rounded-3xl border border-white/20 bg-[#300854] backdrop-blur-md shadow-[0_0_60px_#8C3EC170] overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-transparent before:animate-borderSweep before:bg-gradient-to-r before:from-transparent before:via-[#30214F] before:to-transparent before:bg-[length:200%_100%]">
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full border-2 border-[#8C3EC1] mx-auto flex items-center justify-center mb-6 shadow-[0_0_25px_#8C3EC1]">
            <svg
              className="w-10 h-10 text-[#FF5CA0]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm-1-11h2v6h-2zm0 8h2v2h-2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submit)}>
            {/* Full Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF5CA0] transition"
                {...register("fullName", { required: "Full Name is required" })}
              />
              {errors.fullName && (
                <p className="text-[#FF5CA0] text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="example@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF5CA0] transition"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-[#FF5CA0] text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF5CA0] transition"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-[#FF5CA0] text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full py-3 mt-6 text-white font-bold text-lg rounded-xl bg-gradient-to-r  shadow-[0_0_20px_#FF5CA0] hover:shadow-[0_0_35px_#FF5CA0] hover:scale-[1.02] transition-all animate-pulse-slow"
            >
              {loading ? "Loading..." : "Create Account"}
            </Button>
          </form>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes borderSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-borderSweep {
          animation: borderSweep 6s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Register;
