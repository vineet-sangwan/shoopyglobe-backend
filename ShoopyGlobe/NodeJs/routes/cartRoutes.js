const express = require('express');
const router = express.Router();
const  {authenticateUser}  = require('../middlerwares/authMiddleware');
const {
  addtocart,
  RemoveItemFromCart,
  GetUserCartItems,
  IncreaseQuantity,
  DecreaseQuantity,
} = require('../controllers/cartController');

// All routes should use authentication middleware

// Define routes for cart operations
router.post('/addtocart',authenticateUser,addtocart);
router.delete('/removecartitem/:cartItemId', authenticateUser, RemoveItemFromCart);
router.get('/user/cartitems/:userId',authenticateUser,GetUserCartItems);
router.put('/incresequantity/:cartItemId',authenticateUser, IncreaseQuantity);
router.put('/decresequantity/:cartItemId',authenticateUser,DecreaseQuantity);

module.exports = router;
  