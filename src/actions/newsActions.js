import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";

export const getNews = createAsyncThunk("news/getNews", async () => {
  const response = await httpFetch({
    url: "/news",
    method: "GET",
  });
  // if (!response.ok) throw Error("Could not fetch news.");
  return response.data;
});
