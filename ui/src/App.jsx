import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserAddPage from "./pages/UserAddPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/add-user" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/add-user" element={<UserAddPage />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;
