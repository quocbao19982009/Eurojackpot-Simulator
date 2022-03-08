import asyncHandler from "express-async-handler";
import User from "../models/userModels";
import generateLottery from "../ultis/generateLottery";
import calculatedWin from "../ultis/calculatedWin";
import { LotteryInterface } from "../models/gameSchema";
import { Request, Response } from "express";
import { CustomRequest } from "./user";

const lotteryCost = 2;

// @desc    submitLottery
// @route   POST /api/lottery/play
// @access  Private
const submitLottery = asyncHandler(async (req: CustomRequest, res) => {
  const user = await User.findById(req.user._id);

  const { playLottery } = req.body;
  const resultLottery = generateLottery();
  if (playLottery) {
    const arrayProfit = playLottery.map((lottery: LotteryInterface) =>
      calculatedWin(lottery, resultLottery)
    );
    const totalProfit = arrayProfit.reduce(
      (partialSum: number, a: number) => partialSum + a,
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
      const updatedBankAccount =
        user.bankAccount - totalLotteryCost + totalProfit;

      user.gameHistory.push(gameSummary);
      user.bankAccount = updatedBankAccount;

      if (updatedBankAccount < 0) {
        res.status(401);
        throw new Error(
          "Not enough money to play. Please popup for Bank Account"
        );
      }

      const updatedUser = await user.save();

      res.json({
        bankAccount: updatedUser.bankAccount,
        gameHistory: updatedUser.gameHistory.slice(-1),
      });
    }
    if (!user) {
      throw new Error("User not found");
    }
  }

  if (!playLottery) {
    res.status(400);
    throw new Error("Invalid Lottery");
  }
});

// @desc    get Lottery Hisotry
// @route   GET /api/lottery/history
// @access  Private
const getLotteryHistory = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("Invalid credential");
    }

    const gameHistory = user.gameHistory;
    res.json(gameHistory);
  }
);

export { submitLottery, getLotteryHistory };
