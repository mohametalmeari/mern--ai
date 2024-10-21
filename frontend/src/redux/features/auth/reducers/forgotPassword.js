import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`;
      await axios.post(url, data);

      return { success: true };
    } catch (error) {
      return {
        error: error?.response?.data?.error || "Something went wrong!",
      };
    }
  }
);
