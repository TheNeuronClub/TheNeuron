import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    qfilter: {
        category: '',
        sort: 'recent',
        search: '',
        qstatus: 'verified'
    }
};

export const questionFilter = createSlice({
    name: "filter",
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state.qfilter = action.payload;
        },
    }
});

export const updatedFilter = questionFilter.actions.updateFilter;
export const queFilter = (state) => state.filter.qfilter;

export default questionFilter.reducer;