import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Interview from "../pages/Interview";
import Problems from "../pages/Problems";
import ResumeReviewer from "../pages/ResumeReviewer";
import Login from "../auth/Login";
import Register from "../auth/Register";
function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/problems"} element={<Problems />} />
        <Route path={"/interview"} element={<Interview />} />
        <Route path={"/resumereviewer"} element={<ResumeReviewer />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
