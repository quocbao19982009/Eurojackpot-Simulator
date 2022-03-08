import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  loginWithGoogle,
  popupAccount,
  getPopupHistory,
} from "../controllers/user";
import authUser from "../middleware/authUser";

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(authUser, getUserProfile);
router.route("/googlelogin").post(loginWithGoogle);
router
  .route("/transaction")
  .post(authUser, popupAccount)
  .get(authUser, getPopupHistory);
export default router;
