import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Loaded token from cookies:", token);
    if (token) {
      setUser({ token });
      console.log("User set with token:", token);
    }
  }, []);

  const login = (userData) => {
    console.log("Login called with userData:", userData);
    setUser(userData);
    Cookies.set("token", userData.token, { expires: 1 });
    console.log("Token set in cookies:", userData.token);
  };

  const logout = () => {
    console.log("Logout called");
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
