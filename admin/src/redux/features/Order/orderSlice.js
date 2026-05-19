import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, updateOrderStatusAPI } from "../../../api/ordersapi/ordersapi.js";


export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (range = "all", { rejectWithValue }) => {
        try {
            const res = await getOrders(range);
            return { data: res.data.data, range };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const res = await updateOrderStatusAPI(id, status);
            return { data: res.data.data, id };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update order status"
            );
        }
    }
);

const initialState = {
    ordersByRange: {
        today: null,
        month: null,
        year: null,
        all: null,
    },
    loading: false,
    updateStatusLoading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;

                const { range, data } = action.payload;

                state.ordersByRange[range] = data;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.updateStatusLoading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.updateStatusLoading = false;
                const updatedOrder = action.payload.data;
                // Update in all ranges if order exists
                Object.keys(state.ordersByRange).forEach((range) => {
                    if (state.ordersByRange[range]) {
                        const index = state.ordersByRange[range].findIndex(o => o._id === updatedOrder._id);
                        if (index !== -1) {
                            state.ordersByRange[range][index] = updatedOrder;
                        }
                    }
                });
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.updateStatusLoading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;