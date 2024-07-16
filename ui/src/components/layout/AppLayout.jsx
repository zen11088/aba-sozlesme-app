import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { key: "1", label: <Link to="/dashboard">Dashboard</Link> },
    { key: "2", label: <Link to="/add-user">Add User</Link> },
    { key: "3", label: <Link to="/profile">Profile</Link> },
    { key: "4", label: <span onClick={handleLogout}>Logout</span> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout className="site-layout">
        <Sider collapsible>
          <Menu theme="dark" mode="inline" items={menuItems} />
        </Sider>
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
