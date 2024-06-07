import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPortfolios,
  getPortfolio,
  createPortfolio,
  deletePortfolio,
  getPortfolioItemTransaction,
  createPortfolioItem,
  deletePortfolioItem,
  putTransaction,
  patchTransaction,
  crateTransaction,
} from "@/actions/portfolioActions";

const initialPortfolio = {
  portfolios: [],
  portfolioItems: {},
  portfolioTransactions: {},
  status: "idle",
  error: null,
  isAuthenticated: true,
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: initialPortfolio,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPortfolios.rejected, (state, action) => {
        if (action.error.message.includes("401")) {
          state.isAuthenticated = false;
        } else {
          state.error = action.error.message;
        }
        state.status = "failed";})
      .addCase(getAllPortfolios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolios = action.payload;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolioItems[action.payload.portfolioId] = action.payload.data;
      })
      .addCase(createPortfolio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolios.push(action.payload);
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolios = state.portfolios.filter(
          (p) => p.id !== action.payload,
        );
      })
      .addCase(getPortfolioItemTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolioTransactions[action.payload.itemId] =
          action.payload.data;
      })
      .addCase(createPortfolioItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        if (state.portfolioItems[action.payload.portfolioId])
          state.portfolioItems[action.payload.portfolioId].push(
            action.payload.data,
          );
        else
          state.portfolioItems[action.payload.portfolioId] = [
            action.payload.data,
          ];
      })
      .addCase(deletePortfolioItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolioItems[action.payload.portfolioId] = state.portfolioItems[
          action.payload.portfolioId
        ].filter((item) => item.id !== action.payload.data.id);
      })
      .addCase(putTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolioTransactions[action.payload.itemId] =
          state.portfolioTransactions[action.payload.itemId].map((t) =>
            t.id === action.payload.data.id ? action.payload.data : t,
          );
      })
      .addCase(patchTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.portfolioTransactions[action.payload.itemId] =
          state.portfolioTransactions[action.payload.itemId].map((t) =>
            t.id === action.payload.data.id ? action.payload.data : t,
          );
      })
      .addCase(crateTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        if (state.portfolioTransactions[action.payload.itemId])
          state.portfolioTransactions[action.payload.itemId].push(
            action.payload.data,
          );
        else
          state.portfolioTransactions[action.payload.itemId] = [
            action.payload.data,
          ];
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

export const { setIsAuthenticated } = portfolioSlice.actions;

export default portfolioSlice.reducer;
