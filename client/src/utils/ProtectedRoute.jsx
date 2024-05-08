import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();


  if (loading) {
    return <div>Loading...</div>;  // Render loading state until check is complete
  }

  if (!user) {
    // Redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;