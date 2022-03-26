import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN = "AUTH_TOKEN";

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const setToken = (newToken) => {
  console.log("new Token from utils", newToken);
  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN);
};

export const AuthContext = createContext();

export const AuthProvider = ({ children, loggedIn, setLoggedIn }) => {
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
