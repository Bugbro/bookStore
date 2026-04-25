import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { placeOrderAPI, getUserOrdersAPI } from '../../../api/orderAPI/orderAPI.js';

//1. Thunk to place an order
export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData, thunkAPI) => {
        try {
            const response = await placeOrderAPI(orderData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to place order');
        }
    }
);

//2. Thunk to get user orders

export const getUserOrders = createAsyncThunk(
    'order/getUserOrders',
    async (_, thunkAPI) => {
        try {
            const response = await getUserOrdersAPI();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch orders'
            );
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        currentOrder: null,
        recentOrders: [],
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
                //push instant new place order so we don't again fetch api
                state.recentOrders.unshift(state.currentOrder);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.payload || 'Failed to place order';
                state.success = false;
            })
            //get user orders
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.recentOrders = action.payload.data || [];
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.payload || 'Failed to fetch orders';
            })
    }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
