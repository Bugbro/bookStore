import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios.js';

// Thunk to place an order
export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData, thunkAPI) => {
        try {
            const response = await api.post('/orders', orderData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to place order');
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        currentOrder: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetOrderState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.currentOrder = action.payload.order || action.payload;
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.payload || 'Failed to place order';
                state.success = false;
            });
    }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
