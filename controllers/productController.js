const Product = require('../model/products.js');

// ➕ Create a new product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save(); // save to MongoDB
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
};

// 📦 Get all products (public)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all from DB
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get products' });
  }
};

// 📄 Get single product by ID (public)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// ✏️ Update product by ID (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// ❌ Delete product by ID (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
