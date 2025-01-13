import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { selectAuthToken } from "../../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectAuthToken);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
