import { createSlice } from "@reduxjs/toolkit";
import { generateVideo } from "./reducers";

const name = "ai/video";

const initialState = {
  video: null,
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
    .addCase(generateVideo.pending, handleCasePending)
    .addCase(generateVideo.rejected, handleCaseRejected)
    .addCase(generateVideo.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.aiError = payload.error;
        state.underConstruction = !!payload?.underConstruction;
        return;
      }

      state.video = payload.video;
    });
};

const codeSlice = createSlice({
  name,
  initialState,
  extraReducers,
});

export default codeSlice.reducer;
