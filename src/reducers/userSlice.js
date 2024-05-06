import { createSlice } from "@reduxjs/toolkit";
import { registerUser,loginUser } from "@/actions/authActions";
import Cookies from "universal-cookie";
const initialState = {
  user: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state,action)=>{
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload;
        let cookies = new Cookies(null,{path: '/'});
        cookies.set("token",state.user?.token);
        // console.log(cookies.get('token'));
      } )
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

export default financeSlice.reducer;
