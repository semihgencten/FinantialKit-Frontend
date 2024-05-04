import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";

export const getWatchlist = createAsyncThunk("user/getWatchlist", async () => {
  const response = await httpFetch({
    url: "/user/watchlist",
    method: "GET",
  });
  // if (!response.ok) throw Error("Failed to load trendings.");
  return response.data;
});

export const getPortfolio = createAsyncThunk("user/getPortfolio", async () => {
  const response = await httpFetch({
    url: "/user/portfolio",
    method: "GET",
  });
  // if (!response.ok) throw Error("Could not fetch portfolio.");
  return response.data;
});
