import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCodeHistory = createAsyncThunk(
  "ai/getCodeHistory",
  async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/ai/code/${id}`;
      const { data } = await axios.get(url, { withCredentials: true });

      return data;
    } catch (error) {
      return {
        error: error?.response?.data?.error || "Something went wrong!",
      };
    }
  }
);
