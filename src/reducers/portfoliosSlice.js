import { createSlice } from "@reduxjs/toolkit";
import { getAllPortfolios,getPortfolio,createPortfolio,deletePortfolio } from "@/actions/portfolioActions";

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
      .addCase(getPortfolio.fulfilled, (state, actions) => {
        state.error = null;
        state.status = "succeeded";
        state.portfolios = actions.payload;
      })
      .addCase(getAllPortfolios.fulfilled, (state,actions)=>{
        state.error = null;
        state.status = "succeeded";
        state.portfolios = actions.payload;
      } )
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
