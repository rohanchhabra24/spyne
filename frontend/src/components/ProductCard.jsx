import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={product.images[0] || "placeholder.jpg"}
        alt={product.title || "Product Image"}
      />

      {/* Product Details */}
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", mb: 1 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Company Name */}
          <Typography variant="body2" color="text.secondary">
            {product.company || "Unknown Company"}
          </Typography>

          {/* Edit Button */}
          <Button
            component={Link}
            to={`/edit-product/${product._id}`}
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              textTransform: "none",
            }}
          >
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
