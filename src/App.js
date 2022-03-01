import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/routes/AdminRoute";
import NotSignedInRoute from "./components/routes/NotSignedInRoute";
import PremiumRoute from "./components/routes/PremiumRoute";
import SignedInRoute from "./components/routes/SignedInRoute";
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

const App = () => {
  return (
    <CustomThemeProvider>
      <SnackBarProvider>
        <AuthProvider>
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
              <SignedInRoute exact path="/get-licence" component={GetLicence} />
              <SignedInRoute exact path="/profile" component={Profile} />

              <PremiumRoute
                exact
                path="/workaway-bot"
                component={WorkawayBot}
              />

              <AdminRoute exact path="/users" component={Users} />

              <Route path="/*" component={NotFound} />
            </Switch>
          </Router>
        </AuthProvider>
      </SnackBarProvider>
    </CustomThemeProvider>
  );
};

export default App;
