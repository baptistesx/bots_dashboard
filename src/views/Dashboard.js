import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import GlobalLayout from "../components/layout/GlobalLayout";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  const history = useHistory();

  const handleRedirectToLienceView = () => {
    history.push("/get-licence");
  };

  return (
    <GlobalLayout>
      <Typography variant="h1">Dashboard</Typography>

      {user.isPremium ? (
        <Button href="/workaway-bot" variant="contained" sx={{ m: 1 }}>
          Workaway messaging
          <ArrowForwardIcon />
        </Button>
      ) : (
        <Button
          onClick={handleRedirectToLienceView}
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
