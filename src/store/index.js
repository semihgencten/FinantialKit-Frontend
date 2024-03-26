import { configureStore } from "@reduxjs/toolkit";
import companySlice from "@/reducers/companySlice";
import { trendSlice } from "@/reducers/stockSlice";
export default configureStore({
  reducer: {
    company: companySlice,
    trend: trendSlice,
  },
});
