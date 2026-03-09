import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("userInfo");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("useInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  const login = (userData) => {
    setUserInfo(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
