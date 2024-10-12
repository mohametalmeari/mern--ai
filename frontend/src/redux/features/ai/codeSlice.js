import { createSlice } from "@reduxjs/toolkit";
import { generateCode, getCodeHistory } from "./reducers";

const name = "ai/code";

const initialState = {
  history: [],
  loading: false,
  aiError: null,
};

const handleCaseRejected = (state) => {
  state.loading = false;
  state.aiError = "Network error";
};

const handleCasePending = (state) => {
  state.loading = true;
  state.aiError = null;
};

const reducers = {
  addToHistory: (state, { payload }) => {
    const { text } = payload;
    const content = {
      role: "user",
      parts: [{ text }],
    };

    state.history.push(content);
  },
  resetHistory: (state) => {
    state.history = [];
  },
};

const extraReducers = (builder) => {
  builder
    .addCase(getCodeHistory.pending, handleCasePending)
    .addCase(getCodeHistory.rejected, handleCaseRejected)
    .addCase(getCodeHistory.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.aiError = payload.error;
        window.location.href = "/dashboard/code-generation";
        return;
      }

      state.history = payload.content;
    });

  builder
    .addCase(generateCode.pending, handleCasePending)
    .addCase(generateCode.rejected, handleCaseRejected)
    .addCase(generateCode.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.aiError = payload.error;
        return;
      }

      if (payload.navigateTo) {
        window.history.pushState(
          null,
          "",
          `/dashboard/code-generation/${payload.navigateTo}`
        );
      }

      state.history.push(payload.data.content);
    });
};

const codeSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

export const { addToHistory, resetHistory } = codeSlice.actions;

export default codeSlice.reducer;
