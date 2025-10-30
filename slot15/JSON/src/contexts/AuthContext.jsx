import React, { createContext, useContext, useState } from "react";
import movieApi from "../api/movieAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await movieApi.get("/accounts");
    const found = res.data.find(
      (acc) => acc.username === username && acc.password === password
    );
    if (found) {
      setUser(found);
      return found;
    }
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
