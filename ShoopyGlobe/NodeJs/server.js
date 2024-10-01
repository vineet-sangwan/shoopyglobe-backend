const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { errorHandler } = require('./middlerwares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json()); // Use Express's built-in body parser
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Define routes with base paths
app.use('/api/users', userRoutes);
app.use( productRoutes);
app.use('/api/cart', cartRoutes);

// Error Middleware
app.use(errorHandler);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
