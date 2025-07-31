// server.js
require('dotenv').config(); // Load .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoute.js');
const productRoutes = require('./routes/productRoute.js');
const signupRoutes = require("./routes/signuproute.js")



const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', signupRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log(' Server running '));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
