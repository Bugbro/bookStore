import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        activeUsers: 0,
    },
    reducers: {
        setActiveUsers: (state, action) => {
            state.activeUsers = action.payload;
        },
    },
});

export const { setActiveUsers } = socketSlice.actions;
export default socketSlice.reducer;