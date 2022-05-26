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
exports.getPopupHistory = exports.popupAccount = exports.loginWithGoogle = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var userModels_1 = __importDefault(require("../models/userModels"));
var generateToken_1 = __importDefault(require("../ultis/generateToken"));
var registerUser = (0, express_async_handler_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, userExits, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModels_1.default.findOne({ email: email })];
            case 1:
                userExits = _b.sent();
                if (userExits) {
                    res.status(400);
                    throw new Error("Email is used. Choose another email.");
                }
                return [4 /*yield*/, userModels_1.default.create({
                        name: name,
                        email: email,
                        password: password,
                    })];
            case 2:
                user = _b.sent();
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
                return [2 /*return*/];
        }
    });
}); });
exports.registerUser = registerUser;
// @desc    Login user & token sent
// @route   POST /api/users/login
// @access  Public
var loginUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, matchPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModels_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(401);
                    throw new Error("Invalid Email or Password");
                }
                return [4 /*yield*/, user.matchPassword(password)];
            case 2:
                matchPassword = _b.sent();
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
                return [2 /*return*/];
        }
    });
}); });
exports.loginUser = loginUser;
// @desc    Get User's Profile
// @route   GET /api/users/profile
// @access  Private
var getUserProfile = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = req.user;
        if (user) {
            res.json(user);
        }
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        return [2 /*return*/];
    });
}); });
exports.getUserProfile = getUserProfile;
// @desc    Sign up with google
// @route   POST /api/users/googlelogin
// @access  Public
var loginWithGoogle = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, googleID, avatar, userExits, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, googleID = _a.googleID, avatar = _a.avatar;
                return [4 /*yield*/, userModels_1.default.findOne({ email: email })];
            case 1:
                userExits = _b.sent();
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
                if (!!userExits) return [3 /*break*/, 3];
                return [4 /*yield*/, userModels_1.default.create({
                        name: name,
                        email: email,
                        password: googleID,
                        avatar: avatar,
                    })];
            case 2:
                user = _b.sent();
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
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.loginWithGoogle = loginWithGoogle;
// @desc    Popup account with paypal
// @route   POST /api/users/transaction
// @access  Priavte
var popupAccount = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, amount, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModels_1.default.findById(req.user._id)];
            case 1:
                user = _a.sent();
                amount = req.body.amount;
                if (!amount) {
                    res.status(40);
                    throw new Error("A minimum amount of 10 Euros is requrired");
                }
                if (!user) return [3 /*break*/, 3];
                user.bankAccount = user.bankAccount + amount;
                user.transaction.push({
                    amount: amount,
                    paidAt: Date.now(),
                });
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _a.sent();
                res.json({
                    bankAccount: updatedUser.bankAccount,
                });
                _a.label = 3;
            case 3:
                if (!user) {
                    throw new Error("User not found");
                }
                return [2 /*return*/];
        }
    });
}); });
exports.popupAccount = popupAccount;
// @desc    Get Popup history
// @route   GET /api/users/transaction
// @access  Priavte
var getPopupHistory = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModels_1.default.findById(req.user._id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404);
                    throw new Error("User is not found");
                }
                if (user) {
                    res.json(user.transaction);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.getPopupHistory = getPopupHistory;
