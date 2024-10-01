import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

// Initial state of cart reducer
const initialState = {
    cartItems: [],
    message: null,
    error: null,
    status: 'idle',
};

// Function to get the token from cookies
const getToken = () => {
    return Cookies.get('token'); 
};

// Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/cart',
});

// Add a request interceptor to include token in headers
axiosInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Async thunk for adding to cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {
    try {
        const response = await axiosInstance.post('/addtocart', {
            userId,
            productId,
            quantity
        });

        return response.data; // Return the necessary data from the response
    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data.message);
            throw new Error(error.response.data.message);
        } else {
            console.error('Error:', error.message);
            throw new Error(error.message);
        }
    }
});

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (cartItemId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`removecartitem/${cartItemId}`);
            return resp.data; // Make sure this returns an object with a message if needed
        } catch (error) {
            return rejectWithValue('Failed to remove item from cart');
        }
    }
);

// Fetch cart items
export const getCartItems = createAsyncThunk('cart/getCartItems', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/user/cartitems/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data.message || 'Failed to fetch cart items');
    }
});

// Increase item quantity
export const increaseQuantity = createAsyncThunk(
    'cart/increaseQuantity',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/incresequantity/${id}`);
            return response.data.message; // Return the message
        } catch (error) {
            return rejectWithValue('Failed to increase quantity');
        }
    }
);

// Decrease item quantity
export const decreaseQuantity = createAsyncThunk(
    'cart/decreaseQuantity',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/decresequantity/${id}`);
            return response.data.message; // Return the message
        } catch (error) {
            return rejectWithValue(error.response?.data.message || 'Failed to decrease quantity');
        }
    }
);

// Create the cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading'; // Set loading state
                state.error = null; // Reset error state
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems.push(action.payload.cartItem);
                state.message = action.payload.message;
                state.error = null;
                state.status = 'succeeded'; // Set loading state to succeeded
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed'; // Set loading state to failed
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                // Remove item logic, assuming action.payload contains necessary data
                const { cartItemId } = action.payload; // Adjust based on actual response
                state.cartItems = state.cartItems.filter(item => item.id !== cartItemId);
                state.message = 'Item removed successfully';
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.error = action.payload; // Handle error message
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload; 
                state.error = null;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.error = action.payload; 
            })
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                state.message = action.payload; 
                state.error = null;
            })
            .addCase(increaseQuantity.rejected, (state, action) => {
                state.error = action.payload; 
            })
            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                state.message = action.payload; 
                state.error = null;
            })
            .addCase(decreaseQuantity.rejected, (state, action) => {
                state.error = action.payload; 
            });
    },
});

// Export the reducer
export default cartSlice.reducer;
