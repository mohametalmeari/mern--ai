import { configureStore } from "@reduxjs/toolkit";

import menu from "./features/menu/menuSlice";
import auth from "./features/auth/authSlice";
import chat from "./features/ai/conversationSlice";
import code from "./features/ai/codeSlice";

export const store = configureStore({
  reducer: { menu, auth, chat, code },
});
