import { useDispatch, useSelector } from "react-redux";
import { useCheckSessionQuery } from "../services/authApiSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { useEffect } from "react";
import { RootState } from "../store";

export default function ProtectedRoutes() {
  const location = useLocation();
  const authState = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useCheckSessionQuery(
    {},
    { skip: authState?.isLoggedIn }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState?.isLoggedIn && data) dispatch(setCredentials(data));
  }, [data, authState?.isLoggedIn, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return authState?.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
