const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlerwares/authMiddleware');
const { registerUser, login, logout, userdetails } = require('../controllers/userController');

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', login);

// User logout
router.post('/logout', authenticateUser, logout);

// Get user details (authenticated)
router.get('/user/:id', authenticateUser, userdetails);

module.exports = router;
