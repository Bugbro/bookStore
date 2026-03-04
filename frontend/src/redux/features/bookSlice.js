import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

//async function to fetch books from the backend
export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async(_,thunkAPI) => {
        try {
            const response = await api.get("/books");
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || "Failed to fetch books");
        }
    }
);

const bookSlice = createSlice({
    name: "books",
    initialState:{
        books: [],
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchBooks.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBooks.fulfilled, (state, action)=>{
            state.loading = false;
            state.books = action.payload;
        })
        .addCase(fetchBooks.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default bookSlice.reducer;