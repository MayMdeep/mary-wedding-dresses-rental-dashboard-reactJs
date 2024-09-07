import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { auth } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userPermissions = user?.permission || [];
  if (requiredPermission && !userPermissions.includes(requiredPermission)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
