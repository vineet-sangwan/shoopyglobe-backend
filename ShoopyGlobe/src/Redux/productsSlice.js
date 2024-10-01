import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await fetch('http://localhost:3000/products'); // Adjust the URL as needed
    return await response.json();
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/product/${productId}`);
      
      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data; // This will be dispatched as the payload in the fulfilled action
    } catch (error) {
      console.error('Error fetching product:', error);
      return rejectWithValue('Failed to fetch product'); // This will be dispatched in the rejected action
    }
  }
);



const productSlice = createSlice({
  name: "products",
  initialState: {
    productsdata: [], // Make sure this is initialized as an array
    message: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.productsdata = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetching all products
    builder
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log("Fetched Products:", action.payload); // Log the fetched products
      state.productsdata = action.payload;
    })
    .addCase(fetchAllProducts.rejected, (state, action) => {
      state.message = "Failed to fetch products.";
    })
    .addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.error = null; // Reset any previous error
    })
    .addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload; // Set the fetched product data
      state.error = null; // Clear any previous errors
    })
    .addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.product = null; // Clear any product data
      state.error = action.error.message; // Set the error message
    });
  },
});

// Export actions and reducer
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
