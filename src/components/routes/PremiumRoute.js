import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Only premium members can access PremiumRoutes
const PremiumRoute = (props) => {
  let auth = useAuth();

  return !auth.user.isPremium ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...props} />
  );
};

export default PremiumRoute;
