import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "../../../api/ordersapi/ordersapi.js";


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

const initialState = {
    ordersByRange: {
        today: null,
        month: null,
        year: null,
        all: null,
    },
    loading: false,
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
            });
    },
});

export default orderSlice.reducer;