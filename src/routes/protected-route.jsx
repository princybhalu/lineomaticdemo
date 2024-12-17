import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, profilingIncomplete = false }) => {
  const isAuthenticated = false
  const hasCompletedProfiling = false
  // Access the authentication state from Redux
  // const { isLoggedIn: isAuthenticated, user } = useSelector(
  //   (state) => state.auth
  // );

  // const hasCompletedProfiling = useSelector(
  //   (state) => state.auth.user?.psychological_profile?.is_profile_completed
  // ); // Assuming `hasCompletedProfiling` is part of user data

  // Check if the user is logged in
  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // Routes that require profiling completion
  const routesList = [
    '/psychological-profile',
    '/psychological-profile/question-list',
    '/psychological-profile/user-analysis',
    '/psychological-profile/free-description',
    '/psychological-profile/ai-crafting',
  ];

  // If profiling is incomplete, redirect to the profiling page
  if (
    !routesList.includes(window.location.pathname) &&
    profilingIncomplete &&
    !hasCompletedProfiling
  ) {
    return <Navigate to="/psychological-profile" replace />;
  }

  // If authenticated and profiling is complete, render children
  return <>{children}</>;
};

export default ProtectedRoute;
