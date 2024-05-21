import { configureStore } from "@reduxjs/toolkit";
import financeSlice from "@/reducers/financeSlice";
import userSlice from "@/reducers/userSlice";
import portfolioSlice from "@/reducers/portfoliosSlice";

export default configureStore({
  reducer: {
    finance: financeSlice,
    user: userSlice,
    portfolio: portfolioSlice,
  },
});
