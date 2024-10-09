import { configureStore } from "@reduxjs/toolkit";

import menu from "./features/menu/menuSlice";

export const store = configureStore({
  reducer: { menu },
});
