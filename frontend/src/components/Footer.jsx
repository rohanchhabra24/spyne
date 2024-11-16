import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main", // Uses theme's primary color
        color: "white", // Ensures contrast for text
        py: 4, // Padding on the Y-axis
        mt: 8, // Adds margin to the top
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          © 2024 Car Management | All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
