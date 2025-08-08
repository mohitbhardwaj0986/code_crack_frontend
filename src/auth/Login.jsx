import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { asyncLogin } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(loading);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    setLoading(true);
    dispatch(asyncLogin(data, navigate));
    
  };
  return (
    <div className=" h-screen flex items-center justify-center bg-gradient-to-br from-[#000000] to-[#0a000b] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      {/* Outer Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#6526B7] rounded-full blur-[150px] opacity-40 top-[20%] left-[10%] -z-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#6526B7] rounded-full blur-[120px] opacity-20 bottom-[10%] right-[5%] -z-10"></div>

      {/* Login Card with glow animation */}
      <div className="relative group w-[90%] max-w-sm p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_60px_#6526B770] overflow-hidden">
        {/* Moving glow line */}
        <span className="absolute top-0 left-0 w-full h-full rounded-2xl pointer-events-none z-10 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-[#6526B7] before:animate-border-glow"></span>

        {/* Content */}
        <div className="relative z-20">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full border-2 border-[#6526B7] mx-auto flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-[#6526B7]"
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

          {/* Inputs */}
          <form onSubmit={handleSubmit(submit)}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-1">
                Email:
              </label>
              <input
                type="email"
                placeholder="example@example.com"
                className="w-full px-4 py-2 rounded-md bg-[#6526B7]/20 text-white placeholder-white/70 border border-[#6526B7]/40 focus:outline-none focus:ring-2 focus:ring-[#6526B7]"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <p className="text-[#6526B7] text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-1">
                Password:
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 rounded-md bg-[#6526B7]/20 text-white placeholder-white/70 border border-[#6526B7]/40 focus:outline-none focus:ring-2 focus:ring-[#6526B7]"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-[#6526B7] text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full py-2 mt-5 text-white bg-[#6526B7] hover:bg-[#5522a1] rounded-lg font-medium transition"
            >
              {loading ? "Loading" : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
