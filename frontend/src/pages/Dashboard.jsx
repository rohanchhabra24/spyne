import React, { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../utils/api";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const [products, setProducts] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchProducts(1); // Fetch the first page
        console.log(data);
        console.log("Fetched Products:", data); // Debugging response
        setProducts(data || []); // Default to empty array if no products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to an empty array
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle Delete Product
  const handleDelete = async (productId) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmation) return;

      await deleteProduct(productId); // Call the delete API
      setProducts(products.filter((product) => product._id !== productId)); // Remove product from state
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const getImageUrl = (images) => {
    if(images.length > 0){
      const img = images[0]
      const splitArr = img.split('/')
      const imageName = splitArr[1]
      return process.env.REACT_APP_API_BASE_URL + '/products/' + imageName
    }
    else return 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png';

  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/add-product"
            sx={{ fontWeight: "bold" }}
          >
            Add New Car
          </Button>
        </Box>

        {/* Loading Indicator */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : products.length > 0 ? (
          <Grid container spacing={3}>
            {/* Product Cards */}
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  sx={{
                    padding: "10px",
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    transition: "transform 0.3s",
                    ":hover": {
                      transform: "scale(1.03)",
                      boxShadow: 5,
                    },
                  }}
                >
                  {/* Product Image */}
                  <img
                    className="w-[50px] rounded-md"
                    src={getImageUrl(product.images)}
                    alt={product.title}
                  />

                  {/* Product Info */}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {product.description.length > 50
                        ? product.description.substring(0, 50) + "..."
                        : product.description}
                    </Typography>
                  </CardContent>

                  {/* Actions */}
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    {/* <Tooltip title="Edit">
                      <IconButton
                        href={`/edit-product/${product._id}`}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(product._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            No products available. Add a product to get started.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
