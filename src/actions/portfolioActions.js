import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";


export const getAllPortfolios = createAsyncThunk("user/getAllPortfolios", async () => {
  const response = await httpFetch({
    url: "/portfolios",
    method: "GET",
  });
  return response.data;
});

export const getPortfolio = createAsyncThunk("user/getPortfolio", async (id) => {
  const response = await httpFetch({
    url: `/portfolios/${id}`,
    method: "GET",
  });
  return response.data;
});

export const createPortfolio = createAsyncThunk("user/createPortfolio", async (body) => {
  // body needs to be like ;
  // {
  //   "name": "string",
  //   "cost_basis": 0,
  //   "market_value": 0,
  //   "day_change": 0
  // }

  const response = await httpFetch({
    url: "/portfolios/create",
    method: "POST",
    data:body
  });
  
  // return type will be;
  // {
  //   "id": 0,
  //   "name": "string",
  //   "cost_basis": 0,
  //   "market_value": 0,
  //   "day_change": 0
  // }
  
  return response.data;
});

export const deletePortfolio = createAsyncThunk("user/deletePortfolio", async (id) => {
  const response = await httpFetch({
    url: `/portfolios/${id}/delete`,
    method: "DELETE",
  });
  return response.data;
});

