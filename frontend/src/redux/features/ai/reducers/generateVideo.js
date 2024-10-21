import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generateVideo = createAsyncThunk(
  "ai/generateVideo",
  async ({ prompt }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ai/video`,
        {
          prompt,
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
