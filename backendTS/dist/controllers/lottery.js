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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLotteryHistory = exports.submitLottery = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var userModels_1 = __importDefault(require("../models/userModels"));
var generateLottery_1 = __importDefault(require("../ultis/generateLottery"));
var calculatedWin_1 = __importDefault(require("../ultis/calculatedWin"));
var lotteryCost = 2;
// @desc    submitLottery
// @route   POST /api/lottery/play
// @access  Private
var submitLottery = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, playLottery, resultLottery, arrayProfit, totalProfit, totalLotteryCost, gameSummary, updatedBankAccount, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModels_1.default.findById(req.user._id)];
            case 1:
                user = _a.sent();
                playLottery = req.body.playLottery;
                resultLottery = (0, generateLottery_1.default)();
                if (!playLottery) return [3 /*break*/, 4];
                arrayProfit = playLottery.map(function (lottery) {
                    return (0, calculatedWin_1.default)(lottery, resultLottery);
                });
                totalProfit = arrayProfit.reduce(function (partialSum, a) { return partialSum + a; }, 0);
                totalLotteryCost = +playLottery.length * lotteryCost;
                gameSummary = {
                    playLottery: playLottery,
                    resultLottery: resultLottery,
                    win: totalProfit,
                    lotteryCost: totalLotteryCost,
                };
                if (!user) return [3 /*break*/, 3];
                updatedBankAccount = user.bankAccount - totalLotteryCost + totalProfit;
                user.gameHistory.push(gameSummary);
                user.bankAccount = updatedBankAccount;
                if (updatedBankAccount < 0) {
                    res.status(401);
                    throw new Error("Not enough money to play. Please popup for Bank Account");
                }
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _a.sent();
                res.json({
                    bankAccount: updatedUser.bankAccount,
                    gameHistory: updatedUser.gameHistory.slice(-1),
                });
                _a.label = 3;
            case 3:
                if (!user) {
                    throw new Error("User not found");
                }
                _a.label = 4;
            case 4:
                if (!playLottery) {
                    res.status(400);
                    throw new Error("Invalid Lottery");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.submitLottery = submitLottery;
// @desc    get Lottery Hisotry
// @route   GET /api/lottery/history
// @access  Private
var getLotteryHistory = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, gameHistory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModels_1.default.findById(req.user._id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("Invalid credential");
                }
                gameHistory = user.gameHistory;
                res.json(gameHistory);
                return [2 /*return*/];
        }
    });
}); });
exports.getLotteryHistory = getLotteryHistory;
