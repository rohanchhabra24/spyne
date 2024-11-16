const app = require("./App");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig"); // Import swagger configuration
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Swagger Documentation Route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
