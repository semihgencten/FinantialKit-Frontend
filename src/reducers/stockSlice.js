import { createSlice } from "@reduxjs/toolkit";
import { getTrendings } from "@/actions/stockActions";


const trendsInitial = {
    trends :[],
    status : "idle",
    error: null
};

export const trendSlice = createSlice({
    name:"trends",
    initialState: trendsInitial,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getTrendings.fullfilled,(state)=>{
            state.status = "succeeded",
            state.error = null,
            state.trends = ["sea"]
        })
        .addDefaultCase((state,action)=>{
            state.trends = ["1","2","3"]
        })
    }
}
);

export default trendSlice.reducer;