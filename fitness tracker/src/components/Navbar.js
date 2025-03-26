import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; // Import logo

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(10px)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", paddingX: "5%" }}>
        
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "white" }}>
            <img src={logo} alt="FitForge Logo" style={{ height: 40, marginRight: 10, filter: "invert(100%)" }} />
            <Typography variant="h6" sx={{ color: "#dd5426c2", fontWeight: "bold" }}>
              FitForge
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: "50px" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/workouts">Workouts</Button>
          <Button color="inherit" component={Link} to="/tracker">Tracking</Button>
          <Button color="inherit" component={Link} to="/diet">Diet</Button>
          <Button color="inherit" component={Link} to="#about">About Us</Button>
        </Box>

        {/* Login Button */}
        <Button
          component={Link}
          to="/login"
          sx={{
            background: "white",
            color: "black",
            fontWeight: "bold",
            padding: "8px 15px",
            fontSize: "16px",
            borderTopRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            transition: "all 0.5s",
            "&:hover": {
              borderTopRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              background: "rgba(0, 0, 0, .5)",
              color: "#dd5426c2",
            },
          }}
        >
          Login
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
