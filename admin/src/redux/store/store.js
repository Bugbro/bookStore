import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import themeReducer from "../features/themeSlice.js";
import bookReducer from "../features/Book/bookSlice.js";
import orderReducer from "../features/Order/orderSlice.js";
import socketReducer from "../features/Socket/socketSlice.js";
import adminDashboardReducer from "../features/Admin/adminDashboardSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        book: bookReducer,
        order: orderReducer,
        adminDashboard: adminDashboardReducer,
        socket: socketReducer,
    },
});


export default store;