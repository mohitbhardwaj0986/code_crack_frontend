import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, accessToken } = useSelector((state) => state.user) || {};

  if (!user || !accessToken) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoutes;
