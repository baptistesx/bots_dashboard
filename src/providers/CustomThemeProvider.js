import { blue, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

export const CustomThemeProvider = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[900],
        mainGradient: "linear-gradient(to right, #0d47a1, #2196f3)",
      },
      secondary: {
        main: green[500],
      },
      success: {
        main: green[500],
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
