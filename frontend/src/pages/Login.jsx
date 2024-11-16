import React, { useState } from "react";
import { login } from "../utils/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  Paper,
} from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Reset error
    try {
      const { data } = await login(formData);
      console.log("Login Successful:", data); // Debug login response
      localStorage.setItem("token", data.token); // Save token
      localStorage.setItem("user", JSON.stringify(data)); // Save user details
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (err) {
      console.error("Error during login:", err); // Debug error
      setError("Invalid email or password");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "primary.main" }}
        >
          Login
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading} // Disable button when loading
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Redirect to Signup */}
        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}
        >
          Don’t have an account?{" "}
          <Button
            href="/signup"
            variant="text"
            color="primary"
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
