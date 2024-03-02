import React from "react";
import { Navigate, useLocation } from "react-router-dom";
function GuardedRoute({ isSignedIn, children }) {
  const lastLocation = useLocation();
  if (!isSignedIn) {
    return (
      <Navigate to={`/login?redirectTo=${lastLocation.pathname}`} replace />
    );
  }
  return children;
}
export default GuardedRoute;
