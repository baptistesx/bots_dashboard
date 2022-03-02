import { Typography } from "@mui/material/";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

function ToolBarUserInfo() {
  const { user } = useAuth();

  return (
    <Typography
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      {`${user.isAdmin ? "Admin," : ""}
        ${user.isPremium ? "Premium, " : ""} ${user?.email} |`}
    </Typography>
  );
}

export default ToolBarUserInfo;
