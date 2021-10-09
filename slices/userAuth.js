import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session: null,
};

export const userAuth = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.session = [action.payload];
        },
        removeUser: (state, action) => {
            state.session = []
        }
    }
});

export const { addUser, removeUser } = userAuth.actions;

export const userSession = (state) => state.session;

export default userAuth.reducer;