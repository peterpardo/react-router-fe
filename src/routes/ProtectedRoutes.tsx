import { useCheckSessionQuery } from "../services/authApiSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const { data, isLoading } = useCheckSessionQuery();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  return data ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
}
