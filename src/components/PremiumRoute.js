import { default as React } from "react";
import { Redirect, Route } from "react-router-dom";

const PremiumRoute = ({ component: Component, ...rest }) => {
  // const { status, data: signInCheckResult } = useSigninCheck();
  const isPremium = JSON.parse(localStorage.getItem("user"))?.isPremium;
  return isPremium ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/not-found" />
  );
};

export default PremiumRoute;
