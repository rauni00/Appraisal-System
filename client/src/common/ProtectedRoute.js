import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const isAuthorized = Array.isArray(roleRequired)
    ? roleRequired.includes(role)
    : role === roleRequired;

  if (!token || !isAuthorized) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
