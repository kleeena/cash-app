import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = localStorage.getItem("access_token"); // Check if user is authenticated

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthLayout;
