import React from "react";
import { ConfigProvider } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import trTR from "antd/es/locale/tr_TR";
import GlobalStyles from "./GlobalStyles";
import LoginPage from "./pages/LoginPage";
import UserAddPage from "./pages/UserAddPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./components/layout/AppLayout";

const theme = {
  token: {
    fontFamily: "'Poppins', sans-serif",
    spacing: "12px",
  },
};

const App = () => (
  <ConfigProvider locale={trTR} form={{ requiredMark: false }} theme={theme}>
    <GlobalStyles />
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/add-user" element={<UserAddPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  </ConfigProvider>
);

export default App;
