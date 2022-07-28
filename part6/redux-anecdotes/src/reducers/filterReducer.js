import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterText(state, action) {
      return action.payload;
    },
  },
});

export const { setFilterText } = filterSlice.actions;
export default filterSlice.reducer;
