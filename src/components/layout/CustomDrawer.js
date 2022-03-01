import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Toolbar } from "@mui/material/";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { DRAWER_WIDTH } from "../../utils/constants";

const CustomDrawer = ({ handleDrawerToggle, mobileOpen, window }) => {
  const auth = useAuth();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerItems = [
    { route: "/dashboard", icon: <HomeIcon />, title: "Home" },
    { route: "/profile", icon: <AccountBoxIcon />, title: "Profile" },
  ];

  if (auth.user?.isAdmin) {
    drawerItems.push({
      route: "/users",
      icon: <GroupIcon />,
      title: "Users",
    });
  }

  const drawer = (
    <div>
      <Toolbar />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {drawerItems.map((element) => (
            <ListItem
              button
              key={element.title}
              component="a"
              href={element.route}
            >
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  return auth.user ? (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  ) : (
    <Box />
  );
};

export default CustomDrawer;
