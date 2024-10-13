import { createSlice } from "@reduxjs/toolkit";
import { generateImage } from "./reducers";

const name = "ai/image";

const initialState = {
  images: [],
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
    .addCase(generateImage.pending, handleCasePending)
    .addCase(generateImage.rejected, handleCaseRejected)
    .addCase(generateImage.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.aiError = payload.error;
        state.underConstruction = !!payload?.underConstruction;
        return;
      }

      state.images = payload.images;
    });
};

const codeSlice = createSlice({
  name,
  initialState,
  extraReducers,
});

export default codeSlice.reducer;
