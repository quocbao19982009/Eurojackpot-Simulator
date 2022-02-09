import lotteryModel from "./lotteryModels";

interface lotteryGameModel {
  playLottery: lotteryModel[];
  resultLottery: lotteryModel;
  win: number;
  lotteryCost: number;
  createdAt: Date;
}

export default lotteryGameModel;
