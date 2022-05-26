"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var lotterySchema = new mongoose_1.default.Schema({
    number: [Number],
    starNumber: [Number],
});
var gameSchema = new mongoose_1.default.Schema({
    playLottery: [lotterySchema],
    resultLottery: lotterySchema,
    win: Number,
    lotteryCost: Number,
    // CalculatedWin(winMoney)  - playLotter.length * 2
    // Or use Win
}, {
    timestamps: true,
});
exports.default = gameSchema;
