import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// NotSignedInRoutes cannot be accessed when signed in
function NotSignedInRoute(props) {
  let auth = useAuth();

  return auth.user ? <Redirect to="/dashboard" /> : <Route {...props} />;
}

export default NotSignedInRoute;
