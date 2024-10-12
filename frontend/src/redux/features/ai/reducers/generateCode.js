import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generateCode = createAsyncThunk(
  "ai/generateCode",
  async ({ id, message }) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/ai/code`;
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
