import { createSlice } from "@reduxjs/toolkit";
import { getTrendings } from "@/actions/stockActions";

const trendsInitial = {
  trends: [],
  status: "idle",
  error: null,
};

export const trendSlice = createSlice({
  name: "trends",
  initialState: trendsInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrendings.fulfilled, (state) => {
      state.status = "succeeded";
      state.error = null;
      state.trends = ["trendCompany1", "trendCompany2"];
    });
  },
});

export default trendSlice.reducer;
