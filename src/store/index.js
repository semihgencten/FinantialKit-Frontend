import { configureStore } from "@reduxjs/toolkit";
import financeSlice from "@/reducers/financeSlice";
import userSlice from "@/reducers/userSlice";
export default configureStore({
  reducer: {
    finance: financeSlice,
    user: userSlice,
  },
});
