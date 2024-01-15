import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        id: 0,
    },
    reducers: {
        update: (state, action) => {
            state.name = action.payload.username
            state.id = action.payload.id
        }
    }
})

export const { update } = userSlice.actions;
export default userSlice.reducer;