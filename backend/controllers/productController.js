const Product = require("../models/productModel");

// Create Product
exports.createProduct = async (req, res) => {
  const { title, description, type, company, dealer } = req.body;
  try {
    const images = req.files.map((file) => file.path); // Get uploaded file paths
    const product = await Product.create({
      title,
      description,
      type,
      company,
      dealer,
      images,
      createdBy: req.user.id, // Add user ID from auth middleware
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch Products with Pagination
exports.getProducts = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const products = await Product.find({ createdBy: req.user.id })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  const { id } = req.params; // Extract product ID from request parameters
  try {
    // Find the product by ID
    const product = await Product.findById(id);

    // If the product is not found, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the authenticated user is authorized to delete the product
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this product" });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

