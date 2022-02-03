import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lotteryModel from "../models/lotteryModels";

export interface LotteryState {
  lotteryInput: lotteryModel;
}

const initialState: LotteryState = {
  lotteryInput: {
    number: [],
    starNumber: [],
  },
};

export const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    changeLotteryNumber: (state, action: PayloadAction<number[]>) => {
      state.lotteryInput.number = action.payload;
    },
    changeLotteryStarNumber: (state, action: PayloadAction<number[]>) => {
      state.lotteryInput.starNumber = action.payload;
    },
  },
});

export default lotterySlice.reducer;
