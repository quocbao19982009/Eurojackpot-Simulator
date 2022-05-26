"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var lottery_1 = require("../controllers/lottery");
var authUser_1 = __importDefault(require("../middleware/authUser"));
router.route("/play").post(authUser_1.default, lottery_1.submitLottery);
router.route("/history").get(authUser_1.default, lottery_1.getLotteryHistory);
exports.default = router;
