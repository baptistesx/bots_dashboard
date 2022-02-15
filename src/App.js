import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { getFirestore } from "firebase/firestore";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider, FirestoreProvider, useFirebaseApp } from "reactfire";
import "./App.css";
import AdminRoute from "./components/AdminRoute";
import NotSignedInRoute from "./components/NotSignedInRoute";
import PremiumRoute from "./components/PremiumRoute";
import SignedInRoute from "./components/SignedInRoute";
import AdminPanel from "./views/AdminPanel";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import ResetPassword from "./views/ResetPassword";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import WorkawayMessaging from "./views/WorkawayMessaging";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    success: {
      main: green[500],
    },
  },
});

function App() {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  const firestoreInstance = getFirestore(app);
  const auth = getAuth(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <ThemeProvider theme={theme}>
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

              <PremiumRoute
                exact
                path="/workaway-messaging"
                component={WorkawayMessaging}
              />

              <AdminRoute exact path="/admin-panel" component={AdminPanel} />

              <Route path="/*" component={NotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
