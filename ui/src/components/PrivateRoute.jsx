import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = () => {
  const { user } = useAuth();
  console.log("PrivateRoute user:", user);

  if (user === null) {
    return <div>Loading...</div>; // Yüklenme göstergesi
  }

  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
