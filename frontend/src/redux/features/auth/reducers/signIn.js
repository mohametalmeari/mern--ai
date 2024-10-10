import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signIn = createAsyncThunk("auth/signIn", async (data) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/login`;
    await axios.post(url, data, { withCredentials: true });

    return { success: true };
  } catch (error) {
    return {
      error: error?.response?.data?.error || "Something went wrong!",
    };
  }
});
