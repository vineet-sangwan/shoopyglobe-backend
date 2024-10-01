import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import searchReducer from './searchSlice'; // Import the search slice
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    search: searchReducer,
    auth:authSlice // Add search slice here
  },
});

export default store;
