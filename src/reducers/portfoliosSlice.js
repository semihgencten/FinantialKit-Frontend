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
        .addCase(getPortfolio.pending, (status) => {
          status.error = null;
          status.status = "loading";
        });
    },
  });
  