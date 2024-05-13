import { createSlice } from "@reduxjs/toolkit";
import { getIndices } from "@/actions/indiceActions";

const initialState = {
  indices: [],
  status: "idle",
  error: null,
};

export const indiceSlice = createSlice({
  name: "indice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIndices.fulfilled, (state, action) => {
      state.status = "succeed";
      state.indices = action.payload;
    });
  },
});
