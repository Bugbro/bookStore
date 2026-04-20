import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBooksAPI, addBookAPI, updateBookAPI, deleteBookAPI } from '../../../api/bookapi/bookapi.js'

export const fetchAllBooks = createAsyncThunk(
    "book/fetchAllBooks", async (_, { rejectWithValue }) => {
        try {
            const res = await getAllBooksAPI();
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch books");
        }
    }
);

export const addBook = createAsyncThunk(
    "book/addBook", async (data, { rejectWithValue }) => {
        try {
            const res = await addBookAPI(data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add book");
        }
    }
);

export const updateBook = createAsyncThunk(
    "book/updateBook", async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateBookAPI(id, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update book");
        }
    }
);

export const deleteBook = createAsyncThunk(
    "book/deleteBook", async (id, { rejectWithValue }) => {
        try {
            await deleteBookAPI(id);
            return id; // Return the deleted book's ID
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete book");
        }
    }
);
const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        loading: false,
        error: null,
        isFetched: false,
    },
    reducers: {
        clearBookStates: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload.data;
                state.isFetched = true;
            })
            .addCase(fetchAllBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //add book
            .addCase(addBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                const newBook = action.payload.data;
                state.books = [
                    newBook,
                    ...state.books.filter(book => book._id !== newBook._id)
                ];
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update book
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBook = action.payload.data;
                state.books = state.books.map(book => 
                    book._id === updatedBook._id ? updatedBook : book
                );
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //delete book
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                state.books = state.books.filter(book => book._id !== id);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearBookStates } = bookSlice.actions;
export default bookSlice.reducer;





