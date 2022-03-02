import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./providers/AuthProvider";
import { CustomThemeProvider } from "./providers/CustomThemeProvider";
import { SnackBarProvider } from "./providers/SnackbarProvider";
import ResetPassword from "./views/auth/ResetPassword";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import Dashboard from "./views/Dashboard";
import GetLicence from "./views/GetLicence";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Profile from "./views/Profile";
import Users from "./views/Users";
import WorkawayBot from "./views/workawayBot/WorkawayBot";

const NotSignedInRoute = lazy(() => {
  return Promise.all([
    import("./components/routes/NotSignedInRoute"),
    new Promise((resolve) => setTimeout(resolve, 200)),
  ]).then(([moduleExports]) => moduleExports);
});
const PremiumRoute = lazy(() => {
  return Promise.all([
    import("./components/routes/PremiumRoute"),
    new Promise((resolve) => setTimeout(resolve, 200)),
  ]).then(([moduleExports]) => moduleExports);
});
const SignedInRoute = lazy(() => {
  return Promise.all([
    import("./components/routes/SignedInRoute"),
    new Promise((resolve) => setTimeout(resolve, 200)),
  ]).then(([moduleExports]) => moduleExports);
});
const AdminRoute = lazy(() => {
  return Promise.all([
    import("./components/routes/AdminRoute"),
    new Promise((resolve) => setTimeout(resolve, 200)),
  ]).then(([moduleExports]) => moduleExports);
});

const App = () => {
  return (
    <CustomThemeProvider>
      <SnackBarProvider>
        <AuthProvider>
          {" "}
          <Suspense fallback={<div>loading...</div>}>
            <Router>
              <Switch>
                <NotSignedInRoute exact path="/" component={Home} />
                <NotSignedInRoute exact path="/signup" component={SignUp} />
                <NotSignedInRoute exact path="/signin" component={SignIn} />
                <NotSignedInRoute
                  exact
                  path="/reset-password"
                  component={ResetPassword}
                />

                <SignedInRoute exact path="/dashboard" component={Dashboard} />
                <SignedInRoute
                  exact
                  path="/get-licence"
                  component={GetLicence}
                />
                <SignedInRoute exact path="/profitle" component={Profile} />

                <PremiumRoute
                  exact
                  path="/workaway-bot"
                  component={WorkawayBot}
                />

                <AdminRoute exact path="/users" component={Users} />

                <Route path="/*" component={NotFound} />
              </Switch>
            </Router>
          </Suspense>
        </AuthProvider>
      </SnackBarProvider>
    </CustomThemeProvider>
  );
};

export default App;
