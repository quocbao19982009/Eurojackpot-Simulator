import { configureStore } from "@reduxjs/toolkit";
import lotterySlice from "../slices/lotterySlice";
import userSlice from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    lottery: lotterySlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
