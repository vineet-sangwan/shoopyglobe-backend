const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Adjust the reference to your user model
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// Use this check to prevent model overwrite
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartItemSchema);

module.exports = Cart;
