import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

type authContextType = {
  isLogin: boolean;
  setIsLogin: (condition: boolean) => void;
  authIsReady: boolean;
  setAuthIsReady: (condition: boolean) => void;
};

type tChildren = {
  children: React.ReactNode;
};

export const AuthContext = createContext<authContextType>({
  isLogin: false,
  setIsLogin: () => { },
  authIsReady: false,
  setAuthIsReady: () => {}
});

export const AuthContextProvider = ({ children }: tChildren) => {
  const [isLogin, setIsLogin] = useState(false);
  const [authIsReady, setAuthIsReady] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setAuthIsReady(true);
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      unsub();
    });
  }, []);


  return (
    <AuthContext.Provider value={{ isLogin, authIsReady,setAuthIsReady, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
