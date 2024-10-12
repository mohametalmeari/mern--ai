import { createSlice } from "@reduxjs/toolkit";
import { generateConversation, getConversationHistory } from "./reducers";

const name = "ai/conversation";

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
    .addCase(getConversationHistory.pending, handleCasePending)
    .addCase(getConversationHistory.rejected, handleCaseRejected)
    .addCase(getConversationHistory.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.aiError = payload.error;
        window.location.href = "/dashboard/conversation";
        return;
      }

      state.history = payload.content;
    });

  builder
    .addCase(generateConversation.pending, handleCasePending)
    .addCase(generateConversation.rejected, handleCaseRejected)
    .addCase(generateConversation.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.aiError = payload.error;
        return;
      }

      if (payload.navigateTo) {
        window.history.pushState(
          null,
          "",
          `/dashboard/conversation/${payload.navigateTo}`
        );
      }

      state.history.push(payload.data.content);
    });
};

const conversationSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

export const { addToHistory, resetHistory } = conversationSlice.actions;

export default conversationSlice.reducer;
