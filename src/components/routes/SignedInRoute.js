import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Only signed in members can access SignedInRoutes
function SignedInRoute(props) {
  let auth = useAuth();

  return !auth.user ? <Redirect to="/" /> : <Route {...props} />;
}

export default SignedInRoute;
