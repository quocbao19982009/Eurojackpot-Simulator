import mongoose from "mongoose";

export interface LotteryInterface {
  number: number[];
  starNumber: number[];
}

const lotterySchema = new mongoose.Schema<LotteryInterface>({
  number: [Number],
  starNumber: [Number],
});

export interface GameInterface {
  playLottery: LotteryInterface[];
  resultLottery: LotteryInterface;
  win: number;
  lotteryCost: number;
}

const gameSchema = new mongoose.Schema<GameInterface>(
  {
    playLottery: [lotterySchema],
    resultLottery: lotterySchema,
    win: Number,
    lotteryCost: Number,
    // CalculatedWin(winMoney)  - playLotter.length * 2
    // Or use Win
  },
  {
    timestamps: true,
  }
);

export default gameSchema;
