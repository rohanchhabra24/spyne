import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../utils/api";
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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    type: "",
    company: "",
    dealer: "",
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct({
          title: data.title,
          description: data.description,
          type: data.type,
          company: data.company,
          dealer: data.dealer,
        });
      } catch (err) {
        setError("Error fetching product data. Please try again.");
        console.error("Error fetching product:", err);
      }
    };
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear error
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("type", product.type);
    formData.append("company", product.company);
    formData.append("dealer", product.dealer);
    images.forEach((image) => formData.append("images", image));

    try {
      await updateProduct(id, formData);
      alert("Product updated successfully");
      navigate("/dashboard");
    } catch (err) {
      setError("Error updating product. Please try again.");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false); // Stop loading
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
          Edit Car
        </Typography>

        {/* Error Alert */}
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
                name="title"
                value={product.title}
                onChange={handleChange}
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
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                name="type"
                value={product.type}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Company */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                variant="outlined"
                fullWidth
                name="company"
                value={product.company}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Dealer */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dealer"
                variant="outlined"
                fullWidth
                name="dealer"
                value={product.dealer}
                onChange={handleChange}
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
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                }}
              >
                {loading ? "Updating..." : "Update Car"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProduct;
