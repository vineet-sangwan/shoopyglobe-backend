const Cart = require('../models/cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');


// Add product to cart
const addtocart = async (req, resp) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        // Validate quantity
        if (!quantity || quantity <= 0) {
            return resp.status(400).json({ message: 'Invalid quantity' });
        }

        console.warn('User ID:', userId, 'Product ID:', productId, 'Quantity:', quantity);

        // Fetch product details to get the price
        const product = await Product.findById(productId);
        if (!product) {
            console.warn('Product not found');
            return resp.status(404).json({ message: 'Product not found' });
        }

        // Check if the cart item already exists for the user and product
        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            // If the product is already in the cart, update the quantity
            cartItem.quantity += quantity;
            await cartItem.save(); // Ensure to save the updated quantity
        } else {
            // If the product is not in the cart, create a new cart item
            cartItem = new Cart({
                userId,
                productId,
                quantity,
            });
            await cartItem.save(); // Save the new cart item
        }

        return resp.status(201).json({ message: 'Item added to cart', cartItem });
    } catch (err) {
        console.error('Error adding product to cart:', err.stack);
        resp.status(500).json({ message: 'Internal server error' });
    }
};

const RemoveItemFromCart = async (req, resp) => {
    try {
      const cartItemId = req.params.cartItemId;
      const removedCartItem = await Cart.findByIdAndDelete(cartItemId);
  
      if (!removedCartItem) {
        return resp.status(404).json({ message: 'Cart item not found' });
      }
  
      resp.json({ message: 'Cart item removed successfully', removedCartItem });
    } catch (err) {
      console.error('Error removing product from cart:', err);
      resp.status(500).json({ message: 'Internal server error' });
    }
  }

// Get user cart items
const GetUserCartItems = async (req, resp) => {
  try {
      const userId = req.params.userId;

      // Validate userId
      if (!userId) {
          return resp.status(400).json({ message: 'User ID is required' });
      }

      // **Change 1: Validate if userId is a valid ObjectId (if using MongoDB)**
      if (!mongoose.isValidObjectId(userId)) {
          return resp.status(400).json({ message: 'Invalid User ID format' });
      }

      const cartItems = await Cart.find({ userId }).populate('productId');

      // Check if the cart is empty
      if (!cartItems.length) {
          return resp.status(404).json({ message: 'Cart is empty' });
      }

      // Mapping cart items to a more detailed response
      const cartItemDetails = cartItems.map(item => ({
          cartItemId: item._id,
          productDetails: item.productId,
          quantity: item.quantity,
      }));

      // Responding with the details of cart items
      resp.json([ cartItemDetails ]);
  } catch (error) {
      console.error('Error fetching cart items:', error.stack);
      resp.status(500).json({ message: 'Internal server error' });
  }
};


// Increase quantity of cart item
const IncreaseQuantity = async (req, resp) => {
    try {
        const {cartItemId} = req.params;
        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) {
            return resp.status(404).json({ message: 'Cart item not found' });
        }

        // Increase the quantity
        cartItem.quantity += 1;
        await cartItem.save();
        resp.json({ message: 'Cart item quantity updated', cartItem });
    } catch (err) {
        console.error('Error increasing quantity of product in cart:', err.stack);
        resp.status(500).json({ message: 'Internal server error' });
    }
};

// Decrease quantity of cart item
const DecreaseQuantity = async (req, resp) => {
    try {
        const {cartItemId} = req.params;
        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem) {
            return resp.status(404).json({ message: 'Cart item not found' });
        }

        // If quantity becomes zero, remove the item from the cart
        if (cartItem.quantity === 1) {
            await Cart.findByIdAndRemove(cartItemId); // Remove the cart item directly by ID
            return resp.json({ message: 'Cart item removed successfully' });
        } else {
            // Decrease the quantity
            cartItem.quantity -= 1;
            await cartItem.save();
            resp.json({ message: 'Cart item quantity updated', cartItem });
        }
    } catch (err) {
        console.error('Error decreasing quantity of product in cart:', err.stack);
        resp.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    addtocart,
    RemoveItemFromCart,
    GetUserCartItems,
    IncreaseQuantity,
    DecreaseQuantity,
};
