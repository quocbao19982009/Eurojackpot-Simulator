import { configureStore } from "@reduxjs/toolkit";
import lotterySlice from "../slices/lotterySlice";

export const store = configureStore({
  reducer: {
    lottery: lotterySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
