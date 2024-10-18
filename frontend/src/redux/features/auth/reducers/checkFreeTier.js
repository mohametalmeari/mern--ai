import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkFreeTier = createAsyncThunk(
  "auth/checkFreeTier",
  async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/free-tier`;
      const { data } = await axios.get(url, { withCredentials: true });

      return data;
    } catch (error) {
      return { in: false };
    }
  }
);
