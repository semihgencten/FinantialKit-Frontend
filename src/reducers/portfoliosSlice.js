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
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: initialPortfolio,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPortfolios.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolios = action.payload;
      })
      .addCase(getPortfolio.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolioItems[action.payload.id] = action.payload.data;
      })
      .addCase(createPortfolio.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolios.push(action.payload);
      })
      .addCase(deletePortfolio.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolios = state.portfolios.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(getPortfolioItemTransaction.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolioTransactions[action.payload.id] = action.payload.data;
      })
      .addCase(createPortfolioItem.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        if (state.portfolioItems[action.payload.id])
          state.portfolioItems[action.payload.id].push(action.payload.data);
        else state.portfolioItems[action.payload.id] = [action.payload.data];
      })
      .addCase(deletePortfolioItem.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolioItems = state.portfolioItems[
          action.payload.portfolioId
        ].filter((item) => item.id !== action.payload.itemId);
      })
      .addCase(putTransaction.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolioTransactions[action.payload.portfolioId] =
          state.portfolioTransactions[action.payload.portfolioId].filter((t) =>
            t.id === action.payload.transaction.id
              ? action.payload.transaction
              : t
          );
      })
      .addCase(patchTransaction.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.portfolioTransactions[action.payload.portfolioId] =
          state.portfolioTransactions[action.payload.portfolioId].map((t) =>
            t.id === action.payload.transaction.id
              ? { ...t, ...action.payload.transaction }
              : t
          );
      })
      .addCase(crateTransaction.fullfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        if (state.portfolioTransactions[action.payload.portfolioId])
          state.portfolioTransactions[action.payload.portfolioId].push(
            action.payload.transaction
          );
        else
          state.portfolioTransactions[action.payload.portfolioId] = [
            action.payload.transaction,
          ];
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});
