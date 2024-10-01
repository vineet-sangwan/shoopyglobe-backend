const express = require('express');
const {
  getProducts,
  getProductById,
} = require('../controllers/productController'); // Ensure this is correct

const router = express.Router();

// Define routes
router.get('/products', getProducts); // Get all products
router.get('/products/:id', getProductById); // Get a single product by ID

module.exports = router;
