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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopupHistory = exports.popupAccount = exports.loginWithGoogle = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModels_1 = __importDefault(require("../models/userModels"));
const generateToken_1 = __importDefault(require("../ultis/generateToken"));
const registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExits = yield userModels_1.default.findOne({ email });
    if (userExits) {
        res.status(400);
        throw new Error("Email is used. Choose another email.");
    }
    const user = yield userModels_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            bankAccount: user.bankAccount,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
}));
exports.registerUser = registerUser;
// @desc    Login user & token sent
// @route   POST /api/users/login
// @access  Public
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModels_1.default.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
    const matchPassword = yield user.matchPassword(password);
    if (user && matchPassword) {
        res.json({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            bankAccount: user.bankAccount,
            token: (0, generateToken_1.default)(user._id.toString()),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
}));
exports.loginUser = loginUser;
// @desc    Get User's Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        res.json(user);
    }
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
}));
exports.getUserProfile = getUserProfile;
// @desc    Sign up with google
// @route   POST /api/users/googlelogin
// @access  Public
const loginWithGoogle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, googleID, avatar } = req.body;
    const userExits = yield userModels_1.default.findOne({ email });
    if (userExits) {
        res.status(200).json({
            _id: userExits._id,
            name: userExits.name,
            email: userExits.email,
            isAdmin: userExits.isAdmin,
            avatar: userExits.avatar,
            bankAccount: userExits.bankAccount,
            token: (0, generateToken_1.default)(userExits._id.toString()),
        });
    }
    if (!userExits) {
        const user = yield userModels_1.default.create({
            name,
            email,
            password: googleID,
            avatar,
        });
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
                bankAccount: user.bankAccount,
                token: (0, generateToken_1.default)(user._id.toString()),
            });
        }
    }
}));
exports.loginWithGoogle = loginWithGoogle;
// @desc    Popup account with paypal
// @route   POST /api/users/transaction
// @access  Priavte
const popupAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.default.findById(req.user._id);
    const { amount } = req.body;
    if (!amount) {
        res.status(40);
        throw new Error("A minimum amount of 10 Euros is requrired");
    }
    if (user) {
        user.bankAccount = user.bankAccount + amount;
        user.transaction.push({
            amount: amount,
            paidAt: Date.now(),
        });
        const updatedUser = yield user.save();
        res.json({
            bankAccount: updatedUser.bankAccount,
        });
    }
    if (!user) {
        throw new Error("User not found");
    }
}));
exports.popupAccount = popupAccount;
// @desc    Get Popup history
// @route   GET /api/users/transaction
// @access  Priavte
const getPopupHistory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModels_1.default.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User is not found");
    }
    if (user) {
        res.json(user.transaction);
    }
}));
exports.getPopupHistory = getPopupHistory;
