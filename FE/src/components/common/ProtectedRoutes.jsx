import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);   
  return isAuth ? <Outlet /> : <Navigate to="/landing" />;
}
