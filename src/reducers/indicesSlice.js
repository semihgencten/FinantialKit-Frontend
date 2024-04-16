import { createSlice } from "@reduxjs/toolkit";
import { getIndices } from "@/actions/indiceActions";
import { getPortfolio } from "@/actions/indiceActions";

const initialState = {
  indices: [],
  status: "idle",
  error: null,
};

export const indiceSlice = createSlice({
  name: "indice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIndices.fulfilled, (state, action) => {
      state.status = "succeed";
      state.indices = action.payload;
    });
  },
});

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
        status.portfolios = ["portfolio1", "portfolio2"];
      })
      .addCase(getPortfolio.pending, (status) => {
        status.error = null;
        status.status = "loading";
      });
  },
});
