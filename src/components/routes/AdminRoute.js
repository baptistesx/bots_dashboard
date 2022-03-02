import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// AdminRoutes can only be accessed by admin members
const AdminRoute = (props) => {
  let auth = useAuth();

  return !auth.user.isAdmin ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...props} />
  );
};

export default AdminRoute;
