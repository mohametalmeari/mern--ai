import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("auth/register", async (data) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/register`;
    await axios.post(url, data);

    return { success: true };
  } catch (error) {
    return {
      error: error?.response?.data?.error || "Something went wrong!",
    };
  }
});
