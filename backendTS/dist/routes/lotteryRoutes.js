"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const lottery_1 = require("../controllers/lottery");
const authUser_1 = __importDefault(require("../middleware/authUser"));
router.route("/play").post(authUser_1.default, lottery_1.submitLottery);
router.route("/history").get(authUser_1.default, lottery_1.getLotteryHistory);
exports.default = router;
