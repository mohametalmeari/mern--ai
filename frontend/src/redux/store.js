import { configureStore } from "@reduxjs/toolkit";

import menu from "./features/menu/menuSlice";
import auth from "./features/auth/authSlice";

export const store = configureStore({
  reducer: { menu, auth },
});
