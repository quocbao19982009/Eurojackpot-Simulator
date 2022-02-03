import express from "express";
const router = express.Router();
import { submitLottery } from "../controllers/lottery.js";
import authUser from "../middleware/authUser.js";

router.route("/play").post(authUser, submitLottery);

export default router;
