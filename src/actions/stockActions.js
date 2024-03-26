import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";

/** 
 * Trendings getter
 * @returns {object} A list of company objects that likes 
 *   {
    "symbol": "AAPL",
    "dailyMovementPercentage": "+2%",
    "price": 150,
    "changeAmount": 3,
    "dailyHigh": 151,
    "dailyLow": 148
  },

*/
export const getTrendings = createAsyncThunk(
    "stocks/getTrendings",
    async () => {
        const response = await httpFetch({
            url:"http://127.0.0.1:8000/api/stocks/trending",
            method: "GET"
        });
        if (!response?.ok) throw Error("Failed to load trendings.");
        return response?.data;
    }
)

/**
 * Top-gainer stocks loader
 * @returns {object} a list of company objects like 
 *   {
    "symbol": "AAPL",
    "dailyMovementPercentage": "+2%",
    "price": 150,
    "changeAmount": 3,
    "dailyHigh": 151,
    "dailyLow": 148
  },
 */
export  const getTopGainers = createAsyncThunk(
    "stocks/getTopGainers",
    async () => {
        const response =await httpFetch({
            url:"/api/stocks/top-gainers",
            method:"GET"
        });
        return response.data;
    }
)

/**
  * Top-gainer stocks loader
  * @return {object} a list of company objects like 
  *  {
  *   "symbol": "GOOGL",
  *   "companyName": "Alphabet Inc.",
  *   "lastPrice": 2800,
  *   "changeAmount": -20,
  *   "changePercentage": "-0.71%",
  *   "volume": 1560000
  * },
  * @todo later 2 params will be added; index and country.
  * For now index is NASDAQ and country is US.
 */
export const getStocks = createAsyncThunk(
    "stocks/getStocks",
    async () => {
        const response =await httpFetch({
            url:"/api/stocks/",
            method: 'GET',
        });
        return response.data;
    }
)

export const getOverview = createAsyncThunk(
    "stocks/getOverview",
    async ()=>{
        const response = await httpFetch({
            url:"/api/stocks/{symbol}/overview",
            method:"GET"
        })
        return response
    }
)


export const getTechnical = createAsyncThunk(
    "stocks/getTechnical",
    async ()=>{
        const response = await httpFetch({
            url:"/api/stocks/{symbol}/technicals",
            method:"GET"
        })
        return response
    }
)

export const getFinancials = createAsyncThunk(
    "stocks/getFinancials",
    async ()=>{
        const response = await httpFetch({
            url:"/api/stocks/{symbol}/financials",
            method:"GET"
        })
        return response
    }
)


export const getNews = createAsyncThunk(
    "stocks/getNews",
    async ()=>{
        const response = await httpFetch({
            url:"/api/stocks/{symbol}/news",
            method:"GET"
        })
        return response
    }
)

export const getCharts = createAsyncThunk(
    "stocks/getCharts",
    async ()=>{
        const response = await httpFetch({
            url:"/api/stocks/{symbol}/charts",
            method:"GET"
        })
        return response
    }
)

export const getPeerAnalysis = createAsyncThunk(
    "stocks/getPeerAnalysis",
    async ()=>{
        const response = await httpFetch({
            url:"/api/stocks/{symbol}/peerAnalysis",
            method:"GET"
        })
        return response
    }
)
