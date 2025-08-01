// server.js

// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route modules
const authRoutes = require('./routes/authRoute.js');
const productRoutes = require('./routes/productRoute.js');
const signupRoutes = require('./routes/signupRoute.js'); // Fixed capitalization

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// Use routes
app.use('/api/auth', authRoutes);        // For login/authentication
app.use('/api/products', productRoutes); // For product-related endpoints
app.use('/api', signupRoutes);           // For signup routes
app.get('/', (req, res) => {
  res.send('server is running');
});


// Get PORT from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;


// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    
      app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
