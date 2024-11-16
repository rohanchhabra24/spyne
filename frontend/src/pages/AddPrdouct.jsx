import React, { useState } from "react";
import { createProduct } from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
} from "@mui/material";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [company, setCompany] = useState("");
  const [dealer, setDealer] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("company", company);
    formData.append("dealer", dealer);
    images.forEach((image) => formData.append("images", image));

    try {
      await createProduct(formData);
      alert("Car added successfully");
      navigate("/dashboard");
    } catch (err) {
      setError("Error adding car. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 2, backgroundColor: "background.paper" }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
            mb: 3,
          }}
        >
          Add New Car
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>

            {/* Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </Grid>

            {/* Company */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                variant="outlined"
                fullWidth
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </Grid>

            {/* Dealer */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dealer"
                variant="outlined"
                fullWidth
                value={dealer}
                onChange={(e) => setDealer(e.target.value)}
                required
              />
            </Grid>

            {/* Images */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={(e) => setImages([...e.target.files])}
                />
              </Button>
              <Typography
                variant="caption"
                sx={{ mt: 1, display: "block", textAlign: "center" }}
              >
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : "No files selected"}
              </Typography>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                Add Car
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
