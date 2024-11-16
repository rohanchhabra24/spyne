import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main", color: "white" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo/Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          Car Management
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              ":hover": { textDecoration: "underline" },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              ":hover": { textDecoration: "underline" },
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/all-products"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              ":hover": { textDecoration: "underline" },
            }}
          >
            All Products
          </Button>
          
          
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              ":hover": { textDecoration: "underline" },
            }}
          >
            Login
         
          </Button>
          <Button
            component={Link}
            to="/signup"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              ":hover": { textDecoration: "underline" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
