import { createSlice } from "@reduxjs/toolkit";
import { activateAccount, register, signIn, signOut } from "./reducers";

const name = "auth";

const initialState = {
  isAuthenticated: false,
  authError: null,
  signedUp: false,
  verified: false,
  loading: false,
};

const reducers = {
  resetError: (state) => {
    state.authError = null;
  },
};

const extraReducers = (builder) => {
  builder
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.authError = null;
      state.signedUp = false;
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.signedUp = !!payload?.success;
    })
    .addCase(register.rejected, (state) => {
      state.loading = false;
      state.authError = "Network error";
    });

  builder
    .addCase(activateAccount.pending, (state) => {
      state.loading = true;
      state.authError = null;
    })
    .addCase(activateAccount.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.verified = !!payload?.success;
    })
    .addCase(activateAccount.rejected, (state) => {
      state.loading = false;
      state.authError = "Network error";
    });

  builder
    .addCase(signIn.pending, (state) => {
      state.loading = true;
      state.authError = null;
    })
    .addCase(signIn.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      window.location.href = "/dashboard";
    })
    .addCase(signIn.rejected, (state) => {
      state.loading = false;
      state.authError = "Network error";
    });

  builder
    .addCase(signOut.pending, (state) => {
      state.loading = true;
      state.authError = null;
    })
    .addCase(signOut.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.isAuthenticated = false;
      window.location.href = "/";
    })
    .addCase(signOut.rejected, (state) => {
      state.loading = false;
      state.authError = "Network error";
    });
};

const authSlice = createSlice({ name, initialState, reducers, extraReducers });

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
