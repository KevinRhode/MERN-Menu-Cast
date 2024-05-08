import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './auth.js'; // Make sure the path is correct

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Add a loading state

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      setUser(profile);
    }
    setLoading(false);  // Set loading to false after user is set
  }, []);

  const login = (idToken) => {
    return new Promise((resolve, reject) => {
      try {
        AuthService.login(idToken);
        const profile = AuthService.getProfile();
        setUser(profile);
        resolve(profile); // Resolve the promise when login is successful
      } catch (error) {
        reject(error); // Reject the promise if there's an error
      }
    });
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
