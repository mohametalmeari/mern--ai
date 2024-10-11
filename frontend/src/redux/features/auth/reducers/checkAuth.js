import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/is-logged-in`;
    const { data } = await axios.get(url, { withCredentials: true });

    return data;
  } catch (error) {
    return { in: false };
  }
});
