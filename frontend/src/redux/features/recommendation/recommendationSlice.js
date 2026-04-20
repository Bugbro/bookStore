import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Popular books
export const fetchPopularBooks = createAsyncThunk(
    "recommendation/fetchPopularBooks",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:8000/popular");

            return res.data.recommendations;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch popular books");
        }
    }
);

// Similar books
export const fetchRecommendations = createAsyncThunk(
    "recommendation/fetchRecommendations",
    async (bookName, thunkAPI) => {
        try {
            const res = await axios.get(
                `http://localhost:8000/recommend/${encodeURIComponent(bookName)}`
            );
            return res.data.recommendations;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch recommendations");
        }
    }
);

const recommendationSlice = createSlice({
    name: "recommendation",
    initialState: {
        popular: [],
        recommendations: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Popular
            .addCase(fetchPopularBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPopularBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.popular = action.payload;
            })
            .addCase(fetchPopularBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Recommendations
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendations = action.payload;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default recommendationSlice.reducer;