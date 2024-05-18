import { createSlice } from "@reduxjs/toolkit";
import { getPortfolio } from "@/actions/indiceActions";

const initialPortfolio = {
  portfolios: [],
  status: "idle",
  error: null,
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: initialPortfolio,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.fulfilled, (status, actions) => {
        status.error = null;
        status.status = "succeeded";
        status.portfolios = actions.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        },
      );
  },
});
