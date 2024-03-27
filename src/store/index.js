import { configureStore } from "@reduxjs/toolkit";
import financeSlice from "@/reducers/financeSlice";
export default configureStore({
  reducer: {
    finance: financeSlice,
  },
});
