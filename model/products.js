const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: String,
  image: String, // optional image URL
}, { timestamps: true }); // adds createdAt & updatedAt

module.exports = mongoose.model('Product', productSchema);
