import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";

export const getIndices = createAsyncThunk("user/getIndices", async () => {
  const response = await httpFetch({
    url: "/user/watchlist",
    method: "GET",
  });
  // if (!response.ok) throw Error("Could not fetch watchlist.");
  return response.data;
});

export const getPortfolio = createAsyncThunk("user/getPortfolio", async () => {
  // return ["mrb"]
  const response = await httpFetch({
    url: "/user/portfolio",
    method: "GET",
  });
  // if (!response.ok) throw Error("Could not fetch portfolio.");
  return response.data;
});
