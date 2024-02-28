import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProfileDropDown from "./ProfileDropDown";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Collapse, Divider } from "@mui/material";
import { Menu as MenuIcon, ExpandLess, ExpandMore } from "@mui/icons-material";

const MasterLayout = (props) => {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = Cookies.get("token");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [open, setOpen] = useState(false); // Add state for the collapse

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8000/api/v1/profile",
          config
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = () => { // Define handleClick function to toggle the collapse
    setOpen(!open);
  };

  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your Brand
          </Typography>
          <div>
            {isLoggedIn ? (
              <>
                {userData && <ProfileDropDown />}
                <IconButton color="inherit" component={Link} to="/login">
                  <i className="bi bi-bell-fill"></i>
                </IconButton>
              </>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        open={isSidebarOpen}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button onClick={handleClick}> {/* Apply handleClick to the ListItem button */}
            <ListItemText primary="User Profile" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/profile">
                <ListItemText primary="User Information" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button component={Link} to="/brands">
            <ListItemText primary="Brands" />
          </ListItem>
          <ListItem button component={Link} to="/category">
            <ListItemText primary="Category" />
          </ListItem>
          <ListItem button component={Link} to="/product">
            <ListItemText primary="Product" />
          </ListItem>
        </List>
      </Drawer>

      <main>
        <Toolbar />
        {props.children}
      </main>

      <Toaster position="top-center" reverseOrder={false} />
    </Fragment>
  );
};

export default MasterLayout;
