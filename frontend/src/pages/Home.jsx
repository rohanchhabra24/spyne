import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 6,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "primary.main",
            mb: 3,
          }}
        >
          Welcome to Car Management
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 5,
            fontSize: "1.2rem",
          }}
        >
          Manage your car inventory effortlessly. Add, edit, or remove your car
          listings with ease.
        </Typography>

        {/* Call to Actions */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            href="/signup"
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Sign Up
          </Button>
          <Button
            href="/login"
            variant="outlined"
            color="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
