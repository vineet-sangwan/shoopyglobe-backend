import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "", // Default value for search query
  reducers: {
    setSearchQuery: (state, action) => action.payload, // Update search query
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
