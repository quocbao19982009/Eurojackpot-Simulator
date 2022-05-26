import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "../slices/alertSlice";
import lotterySlice from "../slices/lotterySlice";
import userSlice from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    lottery: lotterySlice,
    user: userSlice,
    alert: alertSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
