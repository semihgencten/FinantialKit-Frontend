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
