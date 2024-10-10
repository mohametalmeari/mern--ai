import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/logout`;
    await axios.delete(url, { withCredentials: true });

    return { success: true };
  } catch (error) {
    return {
      error: error?.response?.data?.error || "Something went wrong!",
    };
  }
});
