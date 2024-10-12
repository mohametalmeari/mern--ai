import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generateConversation = createAsyncThunk(
  "ai/generateConversation",
  async ({ id, message }) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/ai/conversation`;
      const { data } = await axios.post(
        url,
        { id, message },
        { withCredentials: true }
      );

      const navigateTo = !id && data?.id;

      return { data, navigateTo };
    } catch (error) {
      return {
        error: error?.response?.data?.error || "Something went wrong!",
      };
    }
  }
);
