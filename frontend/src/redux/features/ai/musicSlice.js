import { createSlice } from "@reduxjs/toolkit";
import { generateMusic } from "./reducers";

const name = "ai/video";

const initialState = {
  audio: null,
  loading: false,
  aiError: null,
  underConstruction: false,
};

const handleCaseRejected = (state) => {
  state.loading = false;
  state.aiError = "Network error";
};

const handleCasePending = (state) => {
  state.loading = true;
  state.aiError = null;
};

const extraReducers = (builder) => {
  builder
    .addCase(generateMusic.pending, handleCasePending)
    .addCase(generateMusic.rejected, handleCaseRejected)
    .addCase(generateMusic.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.aiError = payload.error;
        state.underConstruction = !!payload?.underConstruction;
        return;
      }

      state.audio = payload.audio;
    });
};

const codeSlice = createSlice({
  name,
  initialState,
  extraReducers,
});

export default codeSlice.reducer;
