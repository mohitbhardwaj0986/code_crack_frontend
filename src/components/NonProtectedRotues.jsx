import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function NonProtectedRotues() {
  const { user, accessToken } = useSelector((state) => state?.user);
console.log(user, accessToken);

  return !user || !accessToken ? <Outlet /> : <Navigate to={"/"} />;
}

export default NonProtectedRotues;
