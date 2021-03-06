"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var user_1 = require("../controllers/user");
var authUser_1 = __importDefault(require("../middleware/authUser"));
router.route("/").post(user_1.registerUser);
router.route("/login").post(user_1.loginUser);
router.route("/profile").get(authUser_1.default, user_1.getUserProfile);
router.route("/googlelogin").post(user_1.loginWithGoogle);
router
    .route("/transaction")
    .post(authUser_1.default, user_1.popupAccount)
    .get(authUser_1.default, user_1.getPopupHistory);
exports.default = router;
