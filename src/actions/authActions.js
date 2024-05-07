import { createAsyncThunk } from "@reduxjs/toolkit";
import httpFetch from "@/utils/httpFetch";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (body) => {
    // EXAMPLE BODY
    // {
    //   "username": "cool-username",
    //   "email": "user@example.com",
    //   "password": "string",
    //   "password2": "string"
    // }
    console.log("body: ", body);
    const response = await httpFetch({
      method: "POST",
      url: "/users/register/",
      data: body,
    });
    return response.data;
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body) => {
    // console.log(body);
    const response = await httpFetch({
      method: "POST",
      url: "/users/login/",
      data:body
    });
    return response.data;

  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ()=>{} // This could be changed but for now it is handled from user slice module

)