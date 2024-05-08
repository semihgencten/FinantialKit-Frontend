import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";

export const fetchPortfolios = createAsyncThunk(
  "portfolios/fetchPortfolios",
  async (_, { getState }) => {
    const accessToken = getState().auth.accessToken;
    try {
      const response = await httpFetch("/portfolios/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  },
);

export const fetchPortfolioDetail = createAsyncThunk(
  "portfolios/fetchPortfolioDetail",
  async (portfolioId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    try {
      const response = await httpFetch(`/portfolios/${portfolioId}/detail`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  },
);

export const createPortfolio = createAsyncThunk(
  "portfolios/createPortfolio",
  async (portfolioData, { getState }) => {
    const accessToken = getState().auth.accessToken;
    try {
      const response = await httpFetch("/portfolios/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(portfolioData),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  },
);

export const deletePortfolio = createAsyncThunk(
  "portfolios/deletePortfolio",
  async (portfolioId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    try {
      await httpFetch(`/portfolios/${portfolioId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return portfolioId; // Return the deleted portfolio ID
    } catch (error) {
      throw error;
    }
  },
);

export const createPortfolioItem = createAsyncThunk(
  "portfolios/createPortfolioItem",
  async (portfolioItemData, { getState }) => {
    const accessToken = getState().auth.accessToken;
    try {
      const response = await httpFetch("/portfolios/items/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(portfolioItemData),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  },
);

export const deletePortfolioItem = createAsyncThunk(
  "portfolios/deletePortfolioItem",
  async (portfolioItemId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    try {
      await httpFetch(`/portfolios/items/${portfolioItemId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return portfolioItemId;
    } catch (error) {
      throw error;
    }
  },
);
