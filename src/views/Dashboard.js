import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import GlobalLayout from "../components/layout/GlobalLayout";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  const history = useHistory();

  const handleNavigate = (path) => {
    history.push(path);
  };

  return (
    <GlobalLayout>
      <Typography variant="h1">Dashboard</Typography>

      {user.isPremium ? (
        <Button
          onClick={() => handleNavigate("/workaway-bot")}
          variant="contained"
          sx={{ m: 1 }}
        >
          Workaway messaging
          <ArrowForwardIcon />
        </Button>
      ) : (
        <Button
          onClick={() => handleNavigate("/get-licence")}
          variant="contained"
          sx={{ m: 1 }}
        >
          Get Premium Account to access bots !
          <ArrowForwardIcon />
        </Button>
      )}

      {!user.isEmailVerified ? (
        <Typography>
          Remember to check the confirmation email we sent you.
        </Typography>
      ) : (
        <Box />
      )}
    </GlobalLayout>
  );
}

export default Dashboard;
