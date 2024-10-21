import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getConversationHistory = createAsyncThunk(
  "ai/getConversationHistory",
  async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/ai/conversation/${id}`;
      const { data } = await axios.get(url, { withCredentials: true });

      return data;
    } catch (error) {
      return {
        error: error?.response?.data?.error || "Something went wrong!",
      };
    }
  }
);
