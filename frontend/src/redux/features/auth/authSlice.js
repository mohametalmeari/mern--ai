import { createSlice } from "@reduxjs/toolkit";
import {
  activateAccount,
  checkFreeTier,
  forgotPassword,
  register,
  resetPassword,
  signIn,
  signOut,
} from "./reducers";
import { checkAuth } from "./reducers/checkAuth";

const name = "auth";

const initialState = {
  isAuthenticated: undefined,
  isPremium: false,
  freeGenerations: 0,
  authError: null,
  authSuccess: false,
  verified: false,
  loading: false,
};

const reducers = {
  resetError: (state) => {
    state.authError = null;
  },
};

const handleCaseRejected = (state) => {
  state.loading = false;
  state.authError = "Network error";
};

const handleCasePending = (state) => {
  state.loading = true;
  state.authError = null;
  state.authSuccess = false;
};

const extraReducers = (builder) => {
  builder
    .addCase(register.pending, handleCasePending)
    .addCase(register.rejected, handleCaseRejected)
    .addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.authSuccess = !!payload?.success;
    });

  builder
    .addCase(activateAccount.pending, handleCaseRejected)
    .addCase(activateAccount.rejected, handleCaseRejected)
    .addCase(activateAccount.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.verified = !!payload?.success;
    });

  builder
    .addCase(signIn.pending, handleCaseRejected)
    .addCase(signIn.rejected, handleCaseRejected)
    .addCase(signIn.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.isAuthenticated = true;
    });

  builder
    .addCase(signOut.pending, handleCaseRejected)
    .addCase(signOut.rejected, handleCaseRejected)
    .addCase(signOut.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.isAuthenticated = false;
      window.location.href = "/";
    });

  builder
    .addCase(checkAuth.rejected, (state) => {
      state.isAuthenticated = false;
    })
    .addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.isAuthenticated = payload.in;
    });

  builder
    .addCase(checkFreeTier.rejected, (state) => {
      state.isPremium = false;
      state.freeGenerations = 0;
    })
    .addCase(checkFreeTier.fulfilled, (state, { payload }) => {
      state.isPremium = payload.isPremium;
      state.freeGenerations = payload.freeGenerations;
    });

  builder
    .addCase(forgotPassword.pending, handleCaseRejected)
    .addCase(forgotPassword.rejected, handleCaseRejected)
    .addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.authSuccess = !!payload?.success;
    });

  builder
    .addCase(resetPassword.pending, handleCaseRejected)
    .addCase(resetPassword.rejected, handleCaseRejected)
    .addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.authSuccess = !!payload?.success;
    });
};

const authSlice = createSlice({ name, initialState, reducers, extraReducers });

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
