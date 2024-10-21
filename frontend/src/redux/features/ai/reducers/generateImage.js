import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generateImage = createAsyncThunk(
  "ai/generateImage",
  async ({ prompt, size, samples }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ai/image`,
        {
          prompt,
          size,
          samples,
        },
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return {
        error: error?.response?.data?.error || "Something went wrong!",
        underConstruction: error?.response?.status === 503,
      };
    }
  }
);
