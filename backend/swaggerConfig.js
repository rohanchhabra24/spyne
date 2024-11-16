const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Management API",
      version: "1.0.0",
      description: "API documentation for Car Management System",
    },
    servers: [
      {
        url: "http://localhost:5002/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
module.exports = swaggerDocs;
