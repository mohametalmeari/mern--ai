import { createSlice } from "@reduxjs/toolkit";

const name = "menu";

const initialState = {
  isOpen: false,
  upgradeIsOpen: false,
};

const reducers = {
  closeMenu: (state) => {
    state.isOpen = false;
  },
  openMenu: (state) => {
    state.isOpen = true;
  },
  openUpgrade: (state) => {
    state.upgradeIsOpen = true;
  },
  closeUpgrade: (state) => {
    state.upgradeIsOpen = false;
  },
};

const menuSlice = createSlice({ name, initialState, reducers });

export const { closeMenu, openMenu, openUpgrade, closeUpgrade } =
  menuSlice.actions;

export default menuSlice.reducer;
