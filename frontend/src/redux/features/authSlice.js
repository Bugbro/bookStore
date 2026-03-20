import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios.js';

// Check if user is authenticated via cookie
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/auth/me');
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Not authenticated');
        }
    }
);

// Logout explicit thunk
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await api.post('/auth/logout');
            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to logout');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true, // true by default helps wait for checkAuth
        error: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
            });
    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
