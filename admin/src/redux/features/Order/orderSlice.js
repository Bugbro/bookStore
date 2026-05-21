import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, updateOrderStatusAPI } from "../../../api/ordersapi/ordersapi.js";


export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (arg = {}, { rejectWithValue }) => {
        try {
            const params = typeof arg === "string" ? { range: arg } : arg;
            const { range = "all", page = 1, limit = 4 } = params;
            const res = await getOrders(range, page, limit);
            return {
                orders: res.data.data.orders,
                pagination: res.data.data.pagination,
                range,
            };
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

                const { range, orders, pagination } = action.payload;

                state.ordersByRange[range] = { orders, pagination };
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
                // Update status of order in all ranges if order exists
                Object.keys(state.ordersByRange).forEach((range) => {
                    const rangeData = state.ordersByRange[range];
                    if (rangeData && Array.isArray(rangeData.orders)) {
                        const index = rangeData.orders.findIndex(o => o._id === updatedOrder._id);
                        if (index !== -1) {
                            rangeData.orders[index] = updatedOrder;
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