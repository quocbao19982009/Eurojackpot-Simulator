import express from "express";
const router = express.Router();
import { submitLottery, getLotteryHistory } from "../controllers/lottery";
import authUser from "../middleware/authUser";

router.route("/play").post(authUser, submitLottery);
router.route("/history").get(authUser, getLotteryHistory);
export default router;
