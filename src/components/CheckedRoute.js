import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSigninCheck } from "reactfire";

function CheckedRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return user != null ? (
    <Redirect to="/not-found" />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default CheckedRoute;
