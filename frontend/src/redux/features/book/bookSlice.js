import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios.js";

//async function to fetch books from the backend
export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async(arg, thunkAPI) => {
        try {
            // Handle both old string param and new object param
            const isObject = typeof arg === 'object' && arg !== null;
            const searchQuery = isObject ? arg.searchQuery : (arg || "");
            const page = isObject ? arg.page || 1 : 1;
            const limit = isObject ? arg.limit || 10 : 10;

            let url = `/books?page=${page}&limit=${limit}`;
            if (searchQuery) {
                url += `&search=${searchQuery}`;
            }

            const response = await api.get(url);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch books");
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
        relatedBookLoading: false,
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
            state.relatedBookLoading = true;
        })
        .addCase(fetchRelatedBooks.fulfilled, (state, action)=>{
            state.relatedBookLoading = false;
            state.relatedBooks = action.payload;
        })
        .addCase(fetchRelatedBooks.rejected, (state)=>{
            state.relatedBookLoading = false;
            state.error = action.payload;
        });
    }
});

export default bookSlice.reducer;