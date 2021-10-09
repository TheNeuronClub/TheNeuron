import { configureStore } from "@reduxjs/toolkit";
import filter from "../slices/filter";
import userAuth from "../slices/userAuth";
import userBalance from "../slices/userBalance";

export const store = configureStore({
  reducer: {
    session: userAuth,
    balance: userBalance,
    filter: filter
  },
});