import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (data) => {
    try {
      console.log({ data });

      const url = `${process.env.REACT_APP_API_URL}/api/auth/reset-password`;
      await axios.patch(url, data);

      return { success: true };
    } catch (error) {
      return {
        error: error?.response?.data?.error || "Something went wrong!",
      };
    }
  }
);
