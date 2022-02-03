import mongoose from "mongoose";

const lotterySchema = new mongoose.Schema({
  number: [Number],
  starNumber: [Number],
});

const gameSchema = new mongoose.Schema(
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
