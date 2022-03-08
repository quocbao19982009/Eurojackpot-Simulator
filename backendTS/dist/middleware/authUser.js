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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModels_1 = __importDefault(require("../models/userModels"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
        const jwtToken = token.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
            const user = yield userModels_1.default.findById(decoded.id).select("-password");
            req.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token fail");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("No Token Found");
    }
}));
exports.default = authUser;
