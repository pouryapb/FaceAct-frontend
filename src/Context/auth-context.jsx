import React, { useState } from "react";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ip] = useState("https://murmuring-coast-29701.herokuapp.com");

  const localToken = window.localStorage.getItem("token");
  const localId = window.localStorage.getItem("userId");

  if (localToken && !token) {
    setToken(localToken);
    setUserId(localId);
  }

  const login = (token, userId) => {
    setToken(token);
    setUserId(userId);

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("userId", userId);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);

    window.localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        ip,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
