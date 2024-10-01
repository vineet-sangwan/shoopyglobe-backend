const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // You can modify this based on how you send the token

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Make sure to set your JWT_SECRET in your environment variables

    // Check if the user exists in the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    // Attach user to the request object
    req.user = user;
    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateUser };
