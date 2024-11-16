import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "10%",
        padding: 4,
        color: "text.secondary",
      }}
    >
      {/* Title */}
      <Typography variant="h1" sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}>
        404
      </Typography>
      
      {/* Subtitle */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Page Not Found
      </Typography>
      
      {/* Message */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      
      {/* Back to Home Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ textTransform: "none", fontWeight: "bold", px: 4, py: 1.5 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
