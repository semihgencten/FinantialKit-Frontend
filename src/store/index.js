import { configureStore } from "@reduxjs/toolkit";
import companySlice from "@/reducers/companySlice";

export default configureStore({
  reducer: {
    company: companySlice,
  },
});
