import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lotteryModel from "../models/lotteryModels";

export interface LotteryState {
  lotteryInput: lotteryModel[];
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
};

export const lotterySlice = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    updateLotteryTickets: (state, action: PayloadAction<lotteryModel[]>) => {
      state.lotteryInput = action.payload;
    },
  },
});

export const { updateLotteryTickets } = lotterySlice.actions;

export default lotterySlice.reducer;
