import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateLottery from "../ultis/generateLottery.js";
import calculatedWin from "../ultis/calculatedWin.js";

const lotteryCost = 2;

// @desc    submitLottery
// @route   POST /api/lottery/play
// @access  Private
const submitLottery = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { playLottery } = req.body;
  const resultLottery = generateLottery();
  //   const resultLottery = {
  //     number: [1, 2, 13, 14, 15],
  //     starNumber: [1, 2],
  //   };

  /* 
type resultLottery = {
    number: [1,2,3,4,5],
    starNumber: [1,2]
}

type playLottery = [
    {number: [1,2,3,4,5],
    starNumber: [1,2]
    }, 
     {number: [1,2,3,4,5],
    starNumber: [1,2]
    }, 
]
*/
  if (playLottery) {
    const arrayProfit = playLottery.map((lottery) =>
      calculatedWin(lottery, resultLottery)
    );
    const totalProfit = arrayProfit.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    const totalLotteryCost = +playLottery.length * lotteryCost;

    const gameSummary = {
      playLottery,
      resultLottery,
      win: totalProfit,
      lotteryCost: totalLotteryCost,
    };

    if (user) {
      user.gameHistory.push(gameSummary);
      user.bankAccount = user.bankAccount - totalLotteryCost + totalProfit;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  }

  if (!playLottery) {
    res.status(400);
    throw new Error("Invalid Lottery");
  }
});

export { submitLottery };
