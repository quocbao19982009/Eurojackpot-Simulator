import mongoose from "mongoose";

const lotterySchema = new mongoose.Schema({
  number: [Number],
  starNumber: [Number],
});

const gameSchema = new mongoose.Schema(
  {
    playLottery: [lotterySchema],
    resultLottery: lotterySchema,
    profit: Number,
  },
  {
    timestamps: true,
  }
);

export default gameSchema;
