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
    return { portfolioId: id, data: response.data.portfolio_items };
  },
);

export const createPortfolio = createAsyncThunk(
  "user/createPortfolio",
  async (body) => {
    const response = await httpFetch({
      url: "/portfolios/create",
      method: "POST",
      data: body,
    });

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

export const createPortfolioItem = createAsyncThunk(
  "user/portfolios/createItem",
  async (body) => {
    const response = httpFetch({
      url: "/portfolios/items/create",
      method: "POST",
      data: body,
    });
    return { portfolioId: body.portfolio_id, data: response.data };
  },
);

export const getPortfolioItemTransaction = createAsyncThunk(
  "user/portfolios/getItemTransaction",
  async (id) => {
    const response = httpFetch({
      url: `/portfolios/items/${id}/transactions`,
      method: "GET",
    });

    return { itemId: id, data: response.data };
  },
);

export const deletePortfolioItem = createAsyncThunk(
  "user/portfolios/deletePortfolioItem",
  async (id) => {
    const response = httpFetch({
      url: `/portfolios/items/${id}/delete`,
      method: "DELETE",
    });
    return { portfolioId: response.data.portfolio, data: response.data };
  },
);

export const putTransaction = createAsyncThunk(
  "user/portfolios/putTransaction",
  async (id, body) => {
    const response = httpFetch({
      url: `/portfolios/items/transactions/${id}/update`,
      method: "PUT",
      data: body,
    });
    return { itemId: response.data.portfolio_item, data: response.data };
  },
);

export const patchTransaction = createAsyncThunk(
  "user/portfolios/patchTransaction",
  async (id, body) => {
    const response = httpFetch({
      url: `/portfolios/items/transactions/${id}/update`,
      method: "PATCH",
      data: body,
    });
    return { itemId: response.data.portfolio_item, data: response.data };
  },
);

export const crateTransaction = createAsyncThunk(
  "user/portfolios/createTransaction",
  async (body) => {
    const response = httpFetch({
      url: `/portfolios/items/transactions/create`,
      method: "POST",
      data: body,
    });
    return { itemId: response.data.portfolio_item, data: response.data };
  },
);
