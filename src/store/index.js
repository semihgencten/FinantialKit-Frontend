import { configureStore } from "@reduxjs/toolkit";
import companySlice from "@/reducers/companySlice";
import trendSlice from "@/reducers/trendSlice";
import { portfolioSlice,indiceSlice } from "@/reducers/indicesSlice";
export default configureStore({
  reducer: {
    company: companySlice,
    trend: trendSlice,
    portfolio: portfolioSlice.reducer,
    indice:indiceSlice.reducer,
    
  },
});
