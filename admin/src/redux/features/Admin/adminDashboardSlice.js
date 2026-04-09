import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodayRevenueAPI, getTotalRevenueAPI } from "../../../api/admin/dashboard.js";

export const getTotalRevenue = createAsyncThunk(
    "adminDashboard/getTotalRevenue",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getTotalRevenueAPI();
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch total revenue");
        }
    }
);

export const getTodayRevenue = createAsyncThunk(
    "adminDashboard/getTodayRevenue",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getTodayRevenueAPI();
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch today's revenue");
        }
    }
);

const adminDashboardSlice = createSlice({
    name: "adminDashboard",
    initialState: {
        totalRevenue: 0,
        todayRevenue: 0,
        monthlyRevenue: 0,
        yearlyRevenue: 0,
        loading: false,
        error: null,
    },
    reducers: {
        clearAdminDashboardStates: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTotalRevenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTotalRevenue.fulfilled, (state, action) => {
                state.loading = false;
                state.totalRevenue = action.payload.data;
            })
            .addCase(getTotalRevenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearAdminDashboardStates } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;