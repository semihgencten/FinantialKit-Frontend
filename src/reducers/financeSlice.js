import { createSlice } from "@reduxjs/toolkit";
import {
  getBalancesheet,
  getCashflow,
  getHistories,
  getIncomeStatement,
  getIndicators,
  getStockTechnicals,
} from "@/actions/financeActions";

const initialState = {
  list: [],
  balancesheet: [],
  cashflow: [],
  histories: [],
  incomeStatements: [],
  indicators: [],
  stockTechnicals: [],
  status: "idle",
  error: null,
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalancesheet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.balancesheet = action.payload;
      })
      .addCase(getCashflow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.cashflow = action.payload;
      })
      .addCase(getHistories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.histories = action.payload;
      })
      .addCase(getIncomeStatement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.incomeStatements = action.payload;
      })
      .addCase(getIndicators.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.indicators = action.payload;
      })
      .addCase(getStockTechnicals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.stockTechnicals = action.payload;
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

export default financeSlice.reducer;
