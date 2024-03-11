import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "@/actions/companyActions";
const initialState = {
  list: [],
  status: "idle",
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = [...state.list, action.payload];
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.map((company) => {
          if (company.id === action.payload.id) {
            return action.payload;
          } else {
            return company;
          }
        });
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter(
          (company) => company.id !== action.payload
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default companySlice.reducer;
