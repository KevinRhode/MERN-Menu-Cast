import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './auth.js'; // Make sure the path is correct

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      setUser(profile);
    }
  }, []);

  const login = (idToken) => {
    AuthService.login(idToken);
    const profile = AuthService.getProfile();
    setUser(profile);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
