import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "@/actions/authActions";
import Cookies from "universal-cookie";
const initialState = {
  user: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

let cookies = new Cookies(null, { path: "/" });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload;
        state.isAuthenticated = true;
        cookies.set("token", state.user?.token); // TODO: need to take expiration of the token
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload;
        state.isAuthenticated = true;
        cookies.set("token", state.user?.token); // TODO: need to take expiration of the token
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
        cookies.remove("token");
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        },
      );
  },
});

export default userSlice.reducer;
