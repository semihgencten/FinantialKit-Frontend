import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "utils/httpFetch";

export const getIndices = createAsyncThunk(
    "indices/getIndices", 
    async () => {
        await new Promise(
            (resolve) => {
                setTimeout(resolve, 1000);
            }
        );
        const response = await httpFetch.get("api/indices");
        if (!response.ok) throw Error("Could not fetch indices.");
        return response.data;
    }
)
