import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lotteryModel from "../models/lotteryModels";
import lotteryGameModel from "../models/lotteryGameModels";
export interface LotteryState {
  lotteryInput: lotteryModel[];
  lotteryHistory: lotteryGameModel[];
  loading: boolean;
}

/* LotteryInput = [
  {
    number : [1,2,3,4,5], 
    starNumber: [1,2]
  }, {
    number : [1,2,3,4,5], 
    starNumber: [1,2]
  }
]
*/
const initialState: LotteryState = {
  lotteryInput: [],
  lotteryHistory: [],
  loading: false,
};

export const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    updateLotteryTickets: (state, action: PayloadAction<lotteryModel[]>) => {
      state.lotteryInput = action.payload;
    },
    updateLotteryHistory: (
      state,
      action: PayloadAction<lotteryGameModel[]>
    ) => {
      state.lotteryHistory = action.payload;
      state.loading = false;
    },
    lotteryRequestStart: (state) => {
      state.loading = true;
    },
    lotteryRequestFinish: (state) => {
      state.loading = false;
    },
  },
});

export const {
  updateLotteryTickets,
  updateLotteryHistory,
  lotteryRequestStart,
  lotteryRequestFinish,
} = lotterySlice.actions;

export default lotterySlice.reducer;
