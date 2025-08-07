import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Loading spinner or fallback
import Loading from "./Loading";

// Route Guards
import ProtectedRoutes from "./ProtectdRoutes";
import NonProtectedRoutes from "./NonProtectedRotues";
import AddProblem from "./AddProblem";

// ✅ Lazy Loaded Pages
const Home = lazy(() => import("../pages/Home"));
const Interview = lazy(() => import("../pages/Interview"));
const Problems = lazy(() => import("../pages/Problems"));
const ResumeReviewer = lazy(() => import("../pages/ResumeReviewer"));
const SingleQuestion = lazy(() => import("../pages/SingleQuesiton"));
const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Profile = lazy(() => import("../pages/Profile"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

function MainRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* 🔐 Protected Routes */}
        <Route
          element={<ProtectedRoutes  />}
        >
          <Route path="/problems" element={<Problems />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/resumereviewer" element={<ResumeReviewer />} />
          <Route path="/submission/:id" element={<SingleQuestion />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/add/problem" element={<AddProblem />} />
         
        </Route>

        {/* 🌐 Public Route */}
        <Route path="/" element={<Home />} />

        {/* 🚫 Non-Protected Routes (Login/Register) */}
        <Route element={<NonProtectedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ❌ 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
