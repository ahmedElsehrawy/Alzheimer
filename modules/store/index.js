import React, { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({
  children,
  loggedIn,
  setLoggedIn,
  isAdmin,
  setIsAdmin,
}) => {
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
