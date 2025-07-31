const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// 🔓 Public: view all products
router.get('/', getProducts);

// 🔓 Public: view single product
router.get('/:id', getProductById);

// 🔐 Admin: create new product
router.post('/', protect, isAdmin, createProduct);

// 🔐 Admin: update existing product
router.put('/:id', protect, isAdmin, updateProduct);

// 🔐 Admin: delete product
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;
