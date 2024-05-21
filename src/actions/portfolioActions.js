import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";

export const getAllPortfolios = createAsyncThunk(
  "user/getAllPortfolios",
  async () => {
    const response = await httpFetch({
      url: "/portfolios",
      method: "GET",
    });
    return response.data;
  },
);

export const getPortfolio = createAsyncThunk(
  "user/getPortfolio",
  async (id) => {
    const response = await httpFetch({
      url: `/portfolios/${id}`,
      method: "GET",
    });
    return response.data;
  },
);

export const createPortfolio = createAsyncThunk(
  "user/createPortfolio",
  async (body) => {
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
      data: body,
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
  },
);

export const deletePortfolio = createAsyncThunk(
  "user/portfolios/deletePortfolio",
  async (id) => {
    await httpFetch({
      url: `/portfolios/${id}/delete`,
      method: "DELETE",
    });
    return id;
  },
);

export const getPortfolioItemTransaction = createAsyncThunk(
  "user/portfolios/getItemTransaction",
  async (id) =>{
    const response = httpFetch({
      url:`/portfolios/items/${id}/transactions`,
      method: "GET"
    });
    return response.data;
});

export const createPortfolioItem = createAsyncThunk(
  "user/portfolios/createItem",
  async (body)=> {
    const response = httpFetch({
      url:"/portfolios/items/create",
      method:"POST",
      data: body
    });
    return response.data;
  }
)

export const deletePortfolioItem = createAsyncThunk(
  "user/portfolios/deletePortfolioItem",
  async (id)=>{
    const response = httpFetch({
      url:`/portfolios/items/${id}/delete`,
      method: "DELETE"
    });
    return response.data;
  }
)

export const putTransaction = createAsyncThunk(
  "user/portfolios/putTransaction",
  async (id,body) => {
      const response = httpFetch({
        url:`/portfolios/items/transactions/${id}/update`,
        method: "PUT",
        data:body
      });
      return response.data;
  }
)

export const patchTransaction = createAsyncThunk(
  "user/portfolios/patchTransaction",
  async (id,body) => {
    const response = httpFetch({
      url:`/portfolios/items/transactions/${id}/update`,
      method:"PATCH",
      data: body
    });
    return response.data;
  }
)


// Example usage of creation
// {
//   "portfolio_item": 0,
//   "type": "buy",
//   "trade_date": "2024-05-14",
//   "shares": 32767,
//   "cost": 0,
//   "notes": "string"
// }
export const crateTransaction = createAsyncThunk(
  "user/portfolios/createTransaction",
  async (body) => {
    const response = httpFetch({
      url:`/portfolios/items/transactions/create`,
      method:"POST",
      data: body
    });
    return response.data;
  }
)
