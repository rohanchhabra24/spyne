const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    company: { type: String, required: true },
    dealer: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
