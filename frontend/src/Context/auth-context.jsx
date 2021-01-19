import React, { useState } from "react";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  const localToken = window.localStorage.getItem("token");
  const localId = window.localStorage.getItem("userId");
  const localRequests = window.localStorage.getItem("requests");
  const localFollowings = window.localStorage.getItem("followings");
  const localFollowers = window.localStorage.getItem("followers");

  if (localToken && !token) {
    setToken(localToken);
    setUserId(localId);
    setRequests(localRequests);
    setFollowings(localFollowings);
    setFollowers(localFollowers);
  }

  const login = (token, userId, requests, followings, followers) => {
    setToken(token);
    setUserId(userId);
    setRequests(requests);
    setFollowings(followings);
    setFollowers(followers);

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("requests", requests);
    window.localStorage.setItem("followings", followings);
    window.localStorage.setItem("followers", followers);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setRequests([]);
    setFollowings([]);
    setFollowers([]);

    window.localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        requests,
        followings,
        followers,
        login,
        logout,
        setRequests,
        setFollowings,
        setFollowers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
