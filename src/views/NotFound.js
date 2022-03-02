import { Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import GlobalLayout from "../components/layout/GlobalLayout";
import { useAuth } from "../hooks/useAuth";

function NotFound() {
  const { user } = useAuth();
  const history = useHistory();

  // useEffect(() => {
  //   console.log(currentSessionUser);
  // }, [currentSessionUser]);

  const redirect = () => {
    if (user) {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  };

  return (
    <GlobalLayout>
      <Typography variant="h1">Error 404</Typography>

      <Button variant="contained" onClick={redirect}>
        Back home
      </Button>
    </GlobalLayout>
  );
}

export default NotFound;
