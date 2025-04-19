import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const ProtectedWrapper = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedWrapper;