"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSample = [
    {
        name: "Bao",
        email: "bao@example.com",
        password: bcryptjs_1.default.hashSync("123456", 10),
        isAdmin: true,
        gameHistory: [
            {
                playLottery: [
                    {
                        number: [1, 2, 3, 4, 5],
                        starNumber: [6, 7],
                    },
                    { number: [8, 9, 10, 11, 12], starNumber: [4, 7] },
                ],
                resultLottery: {
                    number: [1, 2, 8, 27, 5],
                    starNumber: [6, 10],
                },
                win: 8,
                lotteryCost: 4,
            },
        ],
        transaction: [
            {
                amount: 10,
                paidAt: Date.now(),
            },
            {
                amount: 100,
                paidAt: Date.now(),
            },
        ],
    },
    {
        name: "Cam",
        email: "cam@example.com",
        password: bcryptjs_1.default.hashSync("123456", 10),
    },
    {
        name: "Bao Google",
        email: "quocbao19982009@gmail.com",
        password: bcryptjs_1.default.hashSync("105314631988845025870", 10),
    },
];
exports.default = userSample;
