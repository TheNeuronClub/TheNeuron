import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: null,
};

export const userBalance = createSlice({
    name: "balance",
    initialState,
    reducers: {
        updateAmount: (state, action) => {
            state.balance = action.payload;
        },
    }
});

export const updateBalance = userBalance.actions.updateAmount;
export const balance = (state) => state.balance.balance;

export default userBalance.reducer;