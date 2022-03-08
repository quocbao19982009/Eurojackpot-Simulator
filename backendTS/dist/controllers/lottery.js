"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLotteryHistory = exports.submitLottery = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModels_1 = __importDefault(require("../models/userModels"));
const generateLottery_1 = __importDefault(require("../ultis/generateLottery"));
const calculatedWin_1 = __importDefault(require("../ultis/calculatedWin"));
const lotteryCost = 2;
// @desc    submitLottery
// @route   POST /api/lottery/play
// @access  Private
const submitLottery = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.default.findById(req.user._id);
    const { playLottery } = req.body;
    const resultLottery = (0, generateLottery_1.default)();
    if (playLottery) {
        const arrayProfit = playLottery.map((lottery) => (0, calculatedWin_1.default)(lottery, resultLottery));
        const totalProfit = arrayProfit.reduce((partialSum, a) => partialSum + a, 0);
        const totalLotteryCost = +playLottery.length * lotteryCost;
        const gameSummary = {
            playLottery,
            resultLottery,
            win: totalProfit,
            lotteryCost: totalLotteryCost,
        };
        if (user) {
            const updatedBankAccount = user.bankAccount - totalLotteryCost + totalProfit;
            user.gameHistory.push(gameSummary);
            user.bankAccount = updatedBankAccount;
            if (updatedBankAccount < 0) {
                res.status(401);
                throw new Error("Not enough money to play. Please popup for Bank Account");
            }
            const updatedUser = yield user.save();
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
}));
exports.submitLottery = submitLottery;
// @desc    get Lottery Hisotry
// @route   GET /api/lottery/history
// @access  Private
const getLotteryHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.default.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("Invalid credential");
    }
    const gameHistory = user.gameHistory;
    res.json(gameHistory);
}));
exports.getLotteryHistory = getLotteryHistory;
