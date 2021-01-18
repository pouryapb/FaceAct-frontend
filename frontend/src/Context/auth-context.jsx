import React, { useState } from "react";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [followings, setFollowings] = useState([]);

  const localToken = window.localStorage.getItem("token");
  const localId = window.localStorage.getItem("userId");
  const localRequests = window.localStorage.getItem("requests");
  const localFollowings = window.localStorage.getItem("followings");

  if (localToken && !token) {
    setToken(localToken);
    setUserId(localId);
    setRequests(localRequests);
    setFollowings(localFollowings);
  }

  const login = (token, userId, requests, followings) => {
    setToken(token);
    setUserId(userId);

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("requests", requests);
    window.localStorage.setItem("followings", followings);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setRequests([]);
    setFollowings([]);

    window.localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        requests,
        followings,
        login,
        logout,
        setRequests,
        setFollowings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
