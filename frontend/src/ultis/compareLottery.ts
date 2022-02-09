import lotteryModel from "../models/lotteryModels";

const compareLotteryTicket = (arr1: number[], arr2: number[]) => {
  return arr1.filter((item) => arr2.includes(item));
};

const matchNumberLottery = (
  playerLottery: lotteryModel,
  resultLottery: lotteryModel
) => {
  const { number: numberSelectedbyUser, starNumber: starNumberSelectedbyUser } =
    playerLottery;
  const { number: numberSelectedResult, starNumber: starNumberSelectedResult } =
    resultLottery;

  const matchNumber = compareLotteryTicket(
    numberSelectedbyUser,
    numberSelectedResult
  );
  const matchStarNumber = compareLotteryTicket(
    starNumberSelectedbyUser,
    starNumberSelectedResult
  );

  return { matchNumber, matchStarNumber };
};

export default matchNumberLottery;
