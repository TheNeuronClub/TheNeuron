import { createSlice } from "@reduxjs/toolkit";

const initialState = false

export const loaderState = createSlice({
    name: "loader",
    initialState,
    reducers: {
        updatedLoader: (state, action) => action.payload
    }
});

export const updateLoader = loaderState.actions.updatedLoader;
export const getLoader = (state) => state.loader;

export default loaderState.reducer;