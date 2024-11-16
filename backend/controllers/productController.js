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
