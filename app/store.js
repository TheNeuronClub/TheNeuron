import { configureStore } from "@reduxjs/toolkit";
import filter from "../slices/filter";
import loader from "../slices/loader";
import userBalance from "../slices/userBalance";

export const store = configureStore({
  reducer: {
    balance: userBalance,
    filter: filter,
    loader: loader
  },
});