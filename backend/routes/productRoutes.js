const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/; // Allowed file types
  const isFileTypeValid = allowedFileTypes.test(file.mimetype);

  if (isFileTypeValid) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png formats are allowed!")); // Reject the file
  }
};

const upload = multer({
  storage, // Storage configuration
  limits: { fileSize: 5 * 1024 * 1024 }, // File size limit (5MB)
  fileFilter, // File type filter
});

const router = express.Router();

// Route to create a new product with up to 10 images
router.post(
  "/", // Endpoint for creating a product
  authMiddleware, // First middleware: User authentication
  (req, res, next) => {
    // Second middleware: Handle file uploads using multer
    upload.array("images", 10)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ message: `Multer error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }
      next(); // Proceed to the next middleware
    });
  },
  createProduct // Final middleware: Controller to create the product
);

router.delete(
  "/:id", // Endpoint for deleting a product by its ID
  authMiddleware, // First middleware: User authentication
  (req, res, next) => {
    // Optional middleware: Perform additional validation or preprocessing
    const { id } = req.params;
    // Example validation to ensure ID is in the correct format (e.g., MongoDB ObjectId)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    next(); // Proceed to the next middleware
  },
  deleteProduct // Final middleware: Controller to delete the product
);

router.get(
  "/:filename", // Endpoint for accessing an image by filename
  (req, res, next) => {
    // Middleware: Validate file type
    const filename = req.params.filename;

    if (!/\.(jpg|jpeg|png|gif)$/.test(filename)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    req.filepath = path.join(__dirname, "../uploads", filename); // Add filepath to the request object
    next(); // Proceed to the next middleware
  },
  (req, res) => {
    // Middleware: Serve the image file
    res.sendFile(req.filepath, (err) => {
      if (err) {
        console.log(err);
        res.status(404).json({ message: "Image not found" });
      }
    });
  }
);

// Route to get all products with pagination
router.get("/", authMiddleware, getProducts);

module.exports = router;
