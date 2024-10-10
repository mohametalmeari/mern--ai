import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const activateAccount = createAsyncThunk(
  "auth/verify",
  async (token) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/activate-account/${token}`;
      await axios.get(url);

      return { success: true };
    } catch (error) {
      return {
        error: error?.response?.data?.error || "Something went wrong!",
      };
    }
  }
);
