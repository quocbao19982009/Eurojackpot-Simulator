import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.js";
import authUser from "../middleware/authUser.js";

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(authUser, getUserProfile);

export default router;
