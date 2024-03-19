import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "utils/httpFetch";

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
export const getTrendigs = createAsyncThunk(
    "stocks/getTrendings",
    async () => {
        await new Promise(
            (resolve) => setTimeout(resolve, 1000) 
        );
        const response = await httpFetch.get("/api/stocks/trending");
        if (!response.ok) throw Error("Failed to load trendings.");
        return response.data;
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
        await new Promise(
            (resolve)=>{
                setTimeout(resolve, 1000); 
            }
        );
        const response =await httpFetch.get("/api/stocks/top-gainers");
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
        await new Promise(
            (resolve)=>{
                setTimeout(resolve, 1000); 
            }
        );
        const response =await httpFetch.get("/api/stocks/");
        return response.data;
    }
)