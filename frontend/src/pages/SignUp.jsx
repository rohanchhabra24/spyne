import React, { useState } from "react";
import { signUp } from "../utils/api";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.phone || formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    try {
      await signUp(formData);
      alert("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
            mb: 3,
          }}
        >
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  position: "relative",
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                      position: "absolute",
                    }}
                  />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 3,
            color: "text.secondary",
          }}
        >
          Already have an account?{" "}
          <Button
            href="/login"
            variant="text"
            color="primary"
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUp;
