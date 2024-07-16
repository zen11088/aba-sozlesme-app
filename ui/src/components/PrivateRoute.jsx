import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = () => {
  const { user } = useAuth();

  if (user === null) {
    return;
  }

  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
