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

export const getIndicesHome = createAsyncThunk("/indices/getIndices", async () => {
    const response = await httpFetch({
      url: "/indices",
      method: "GET",
    });
  
    if (!response.ok) {
      console.error("Failed to fetch indices:", response.error);
      throw Error("Could not fetch indices.");
    }
  
    console.log("Response Data:", response.data);
    console.log("Hello");
    return response.data;
  });
