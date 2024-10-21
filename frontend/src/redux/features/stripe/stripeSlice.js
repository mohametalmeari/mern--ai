import { createSlice } from "@reduxjs/toolkit";
import { subscribe } from "./reducers/subscribe";

const name = "stipe";

const initialState = {
  loading: false,
  stipeError: null,
};

const handleCaseRejected = (state) => {
  state.loading = false;
  state.stipeError = "Network error";
};

const handleCasePending = (state) => {
  state.loading = true;
  state.stipeError = null;
};

const extraReducers = (builder) => {
  builder
    .addCase(subscribe.pending, handleCasePending)
    .addCase(subscribe.rejected, handleCaseRejected)
    .addCase(subscribe.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.stipeError = payload.error;
        return;
      }

      window.location.href = payload;
    });
};

const codeSlice = createSlice({
  name,
  initialState,
  extraReducers,
});

export default codeSlice.reducer;
