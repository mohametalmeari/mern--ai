import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const subscribe = createAsyncThunk("stripe/subscribe", async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/subscribe`,
      { withCredentials: true }
    );

    return data.url;
  } catch (error) {
    return {
      error: error?.response?.data?.error || "Something went wrong!",
    };
  }
});
