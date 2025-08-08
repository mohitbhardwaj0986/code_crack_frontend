import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiBox,
  FiMessageSquare,
  FiFileText,
  FiCheckSquare,
} from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import DashboardHome from "./DashboardHome ";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import {
  asyncChangeAvartar,
  asyncChangePassword,
  asyncUpdateUseDetials,
} from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: <FiHome />, key: "dashboard" },
  { label: "Change Password", icon: <FiBox />, key: "password" },
  { label: "Update Details", icon: <FiFileText />, key: "update account" },
  { label: "Update Profile Image", icon: <FiMessageSquare />, key: "avatar" },
  { label: "To Do List", icon: <FiCheckSquare />, key: "todo" },
];

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("dashboard");
  const [setting, setSetting] = useState(false);
  const { user } = useSelector((state) => state.user);
  const userRole = user.role;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Password change
  const passwordChangeHandle = (data) => {
    dispatch(asyncChangePassword(data, navigate));
    reset();
  };

  // Update account
  const updateAccoundHandle = (data) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    dispatch(asyncUpdateUseDetials(filteredData));
  };

  // Change avatar
  const changeAvatarHandle = (data) => {
    const file = data.avatar[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(asyncChangeAvartar(formData));
    reset();
  };

  // To-do list persistence
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onSubmit = (data) => {
    if (!data.task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: data.task, completed: false }]);
    reset();
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="w-full xl:h-screen bg-[#0C0015] flex md:static xl:static relative flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          setting ? "right-[0%] top-[0%]" : "right-[-100%] top-[-100%]"
        } duration-300 xl:static pt-17 md:static absolute 
        bg-gradient-to-b from-[#1A0033]/95 to-[#0C0015]/95 backdrop-blur-xl
        border-r border-[#3D0066]/50 p-4 w-full md:w-64 shadow-lg`}
      >
        <h2 className="text-xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          {userRole === "admin" ? "Dashboard Settings" : "Profile Settings"}
        </h2>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setSelected(item.key);
                setSetting(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all 
              ${
                selected === item.key
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md scale-[1.02]"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 xl:overflow-y-auto h-full relative">
        <IoSettingsSharp
          onClick={() => setSetting(!setting)}
          className="absolute right-[5%] text-3xl top-4 text-pink-500 xl:hidden md:hidden cursor-pointer"
        />

        <div className="p-6 mt-10">
          {selected === "dashboard" && <DashboardHome />}

          {/* Update Account */}
          {selected === "update account" && (
            <div className="p-6 rounded-xl mt-20 mx-auto shadow-lg max-w-md w-full bg-[#160025] border border-white/10">
              <h2 className="text-xl font-bold mb-6 text-white text-center">
                Update Account Details
              </h2>
              <form
                onSubmit={handleSubmit(updateAccoundHandle)}
                className="space-y-5"
              >
                <div className="flex flex-col">
                  <label className="font-medium mb-1 text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="rounded-lg px-3 py-2 bg-white/90 text-black focus:ring-2 focus:ring-pink-500 outline-none"
                    {...register("fullName")}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium mb-1 text-white">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-lg px-3 py-2 bg-white/90 text-black focus:ring-2 focus:ring-pink-500 outline-none"
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                >
                  {loading ? "Updating..." : "Update Details"}
                </button>
              </form>
            </div>
          )}

          {/* Change Password */}
          {selected === "password" && (
            <div className="p-6 rounded-xl mt-20 mx-auto shadow-lg max-w-md w-full bg-[#160025] border border-white/10">
              <h2 className="text-xl font-bold mb-6 text-white text-center">
                Change Password
              </h2>
              <form
                onSubmit={handleSubmit(passwordChangeHandle)}
                className="space-y-5"
              >
                <div className="flex flex-col">
                  <label className="font-medium mb-1 text-white">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="rounded-lg px-3 py-2 bg-white/90 text-black focus:ring-2 focus:ring-pink-500 outline-none"
                    {...register("oldPassword", {
                      required: "Current password is required",
                    })}
                  />
                  {errors.oldPassword && (
                    <span className="text-red-400 text-sm mt-1">
                      {errors.oldPassword.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="font-medium mb-1 text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="rounded-lg px-3 py-2 bg-white/90 text-black focus:ring-2 focus:ring-pink-500 outline-none"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <span className="text-red-400 text-sm mt-1">
                      {errors.newPassword.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                >
                  {loading ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </div>
          )}

          {/* Avatar Update */}
          {selected === "avatar" && (
            <div className="p-6 mt-20 mx-auto rounded-xl shadow-lg max-w-md w-full bg-[#160025] border border-white/10">
              <h2 className="text-xl font-bold mb-6 text-white text-center">
                Update Profile Image
              </h2>
              <form
                onSubmit={handleSubmit(changeAvatarHandle)}
                className="space-y-5"
              >
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="text-white"
                    {...register("avatar", {
                      required: "Please select an image",
                    })}
                  />
                  {errors.avatar && (
                    <span className="text-red-400 text-sm mt-1">
                      {errors.avatar.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
                >
                  {loading ? "Updating..." : "Update Avatar"}
                </button>
              </form>
            </div>
          )}

          {/* To-Do List */}
          {selected === "todo" && (
            <div
              className="p-6 mt-20 rounded-2xl shadow-lg max-w-md w-full mx-auto backdrop-blur-md"
              style={{
                background: "rgba(22, 0, 37, 0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white text-center">
                ✨ My To-Do List
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-2 mb-5"
              >
                <input
                  type="text"
                  placeholder="What’s your next task?"
                  className="flex-1 rounded-lg px-4 py-2 bg-white/90 text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                  {...register("task", { required: true })}
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-90 transition-all"
                >
                  Add
                </button>
              </form>
              {tasks.length > 0 ? (
                <ul className="space-y-3">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 accent-pink-500 cursor-pointer"
                        />
                        <span
                          className={`text-base ${
                            task.completed
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {task.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 text-lg font-bold"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white text-center mt-4 italic">
                  No tasks yet. Add one above 🚀
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
