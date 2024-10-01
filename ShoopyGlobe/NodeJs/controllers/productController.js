const Product = require('../models/Product');

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Fetch a single product by ID
const getProductById = async (req, resp) => {
  try {
      const productid = req.params.id;
      const product = await Product.find({ _id: productid });
      resp.json(product[0]);
  } catch (err) {
      resp.status(500).json({ message: err.message });
  }
}

module.exports = { getProducts, getProductById};
