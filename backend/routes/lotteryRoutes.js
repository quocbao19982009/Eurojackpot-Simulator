import express from "express";
const router = express.Router();
import { submitLottery, getLotteryHistory } from "../controllers/lottery.js";
import authUser from "../middleware/authUser.js";

router.route("/play").post(authUser, submitLottery);
router.route("/history").get(authUser, getLotteryHistory);
export default router;
