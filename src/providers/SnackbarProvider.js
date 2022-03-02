import { useState, useEffect } from "react";
import { SnackbarContext } from "../contexts/snackbarContext";
import { Snackbar, Alert, Box } from "@mui/material";

const AUTO_DISMISS = 5000;

export function SnackBarProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const activeAlertIds = alerts.join(",");
  
  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(
        () => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)),
        AUTO_DISMISS
      );
      return () => clearTimeout(timer);
    }
  }, [activeAlertIds]);

  const addAlert = (alert) => {
    setAlerts((alerts) => [alert, ...alerts]);
  };

  return (
    <SnackbarContext.Provider value={{ addAlert }}>
      {children}
      {alerts.map((alert, index) => (
        <Box>
          <Snackbar key={alert.message + index} open={true}>
            <Alert severity={alert.severity} sx={{ width: "100%" }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Box>
      ))}
    </SnackbarContext.Provider>
  );
}
