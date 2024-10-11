import { createSlice } from "@reduxjs/toolkit";

const name = "menu";

const initialState = {
  isOpen: false,
};

const reducers = {
  closeMenu: (state) => {
    state.isOpen = false;
  },
  openMenu: (state) => {
    state.isOpen = true;
  },
};

const menuSlice = createSlice({ name, initialState, reducers });

export const { closeMenu, openMenu } = menuSlice.actions;

export default menuSlice.reducer;
