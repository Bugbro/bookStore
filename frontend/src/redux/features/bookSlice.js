import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

//async function to fetch books from the backend
export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async(_,thunkAPI) => {
        try {
            const response = await api.get("/books");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || "Failed to fetch books");
        }
    }
);

export const fetchBookById = createAsyncThunk(
    "books/fetchBookById",
    async (id)=> {
        const response = await api.get(`/books/${id}`);
        return response.data
    }
);

export const fetchRelatedBooks = createAsyncThunk(
    "books/fetchRelatedBooks",
    async(category) =>{
        const response = await api.get(`/books/category/${category}`);
        return response.data;
    }
)

const bookSlice = createSlice({
    name: "books",
    initialState:{
        books: [],
        relatedBooks: [],
        singleBook:null,
        loading: "idle",
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
        })
        .addCase(fetchBookById.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBookById.fulfilled, (state, action)=>{
            state.loading = false;
            state.singleBook = action.payload.data;
        })
        .addCase(fetchBookById.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchRelatedBooks.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchRelatedBooks.fulfilled, (state, action)=>{
            state.loading = false;
            state.relatedBooks = action.payload;
        })
        .addCase(fetchRelatedBooks.rejected, (state)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default bookSlice.reducer;