import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Initial state
const initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
    username: null,
    message: null,
    userId: null,
    user: {},
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Error handling to get actual response
                return rejectWithValue(errorData.message || 'Login failed');
            }

            const data = await response.json();

            // Store token and user ID in cookies for 1 day (ensure consistency)
            Cookies.set('token', data.token, { expires: 1 });
            Cookies.set('userId', data.userId, { expires: 1 });

            return data; // Assumes the API returns token and userId
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Logout failed');
            }

            const data = await response.json();
            return data; // Assumes the API returns a success message
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async (userId, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token'); // Fetch token from cookies
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in Authorization header
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to fetch user details');
            }

            const data = await response.json();
            return data; // Assumes the API returns user data
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutSuccess: (state) => {
            state.token = null;
            state.userId = null;
            state.isAuthenticated = false; // Should be false after logout
            state.username = null;
            state.message = 'Logout successful';
            Cookies.remove('token'); // Remove token from cookies
            Cookies.remove('userId');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.username = action.payload.username;
                state.message = 'Login successful';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.error = action.payload || 'Login failed';
            })

            // Registration cases
            .addCase(registerUser.fulfilled, (state, action) => {
                state.message = action.payload.message || 'Registration successful';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.message = null;
                state.error = action.payload || 'Registration failed';
            })

            // Fetch user details cases
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch user details';
            })

            // Logout cases
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.userId = null;
                state.isAuthenticated = false;
                state.user = {};
                Cookies.remove('token'); // Clear token from cookies
                state.message = 'Logout successful';
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload || 'Logout failed';
            });
    },
});

// Export actions and reducer
export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
