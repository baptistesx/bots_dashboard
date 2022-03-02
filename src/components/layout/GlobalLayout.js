import { useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DRAWER_WIDTH } from "../../utils/constants";
import CustomDrawer from "./CustomDrawer";
import ToolBarUserInfo from "./ToolBarUserInfo";

const GlobalLayout = (props) => {
  const theme = useTheme();

  const history = useHistory();

  const auth = useAuth();

  const { window, children } = props;

  const handleLogoClick = () => history.push("/");

  const onLogoutClick = () => auth.signOut();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          background: theme.palette.primary.mainGradient,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: auth.user ? { sm: "none" } : { xs: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Button onClick={handleLogoClick} style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{ color: "white" }}
            >
              Im-Lazy
            </Typography>
          </Button>

          {auth?.user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ToolBarUserInfo />

              <Button sx={{ color: "white" }} onClick={onLogoutClick}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button sx={{ color: "white" }} href="/signin">
                Sign In
              </Button>

              <Typography>|</Typography>

              <Button sx={{ color: "white" }} href="/signup">
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <CustomDrawer
        handleDrawerToggle={() => handleDrawerToggle()}
        mobileOpen={mobileOpen}
        window={window}
      />

      <Box
        component="main"
        sx={{
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default GlobalLayout;
