"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateToken = function (id) {
    var DataStoreInToken = {
        id: id,
    };
    var token = jsonwebtoken_1.default.sign(DataStoreInToken, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return token;
};
exports.default = generateToken;
