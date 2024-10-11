import { createSlice } from "@reduxjs/toolkit";
import {
  activateAccount,
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

const extraReducers = (builder) => {
  builder
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.authError = null;
      state.authSuccess = false;
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.authSuccess = !!payload?.success;
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

      state.isAuthenticated = true;
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

  builder
    .addCase(checkAuth.pending, (state) => {
      state.isAuthenticated = undefined;
    })
    .addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.isAuthenticated = payload.in;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.isAuthenticated = false;
    });

  builder
    .addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.authError = null;
      state.authSuccess = false;
    })
    .addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.authSuccess = !!payload?.success;
    })
    .addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
      state.authError = "Network error";
    });

  builder
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.authError = null;
      state.authSuccess = false;
    })
    .addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.loading = false;

      if (payload?.error) {
        state.authError = payload.error;
        return;
      }

      state.authSuccess = !!payload?.success;
    })
    .addCase(resetPassword.rejected, (state) => {
      state.loading = false;
      state.authError = "Network error";
    });
};

const authSlice = createSlice({ name, initialState, reducers, extraReducers });

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
