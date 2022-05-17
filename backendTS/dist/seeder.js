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
const dotenv_1 = __importDefault(require("dotenv"));
const userSample_js_1 = __importDefault(require("./data/userSample.js"));
const userModels_js_1 = __importDefault(require("./models/userModels.js"));
const db_js_1 = __importDefault(require("./config/db.js"));
dotenv_1.default.config();
(0, db_js_1.default)();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModels_js_1.default.deleteMany();
        yield userModels_js_1.default.insertMany(userSample_js_1.default);
        console.log("Data Imported!".green.inverse);
        process.exit();
    }
    catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModels_js_1.default.deleteMany();
        console.log("Data destroy!".red.inverse);
        process.exit();
    }
    catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
});
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}
