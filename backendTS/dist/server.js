"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var db_1 = __importDefault(require("./config/db"));
var path_1 = __importDefault(require("path"));
require("colors");
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var lotteryRoutes_1 = __importDefault(require("./routes/lotteryRoutes"));
var errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
var app = (0, express_1.default)();
(0, db_1.default)();
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.json());
// User Routes
app.use("/api/users", userRoutes_1.default);
// Lottery Routes
app.use("/api/lottery", lotteryRoutes_1.default);
console.log(__dirname);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/build")));
    app.get("*", function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html"));
    });
}
else {
    app.get("/", function (req, res) {
        res.send("API is running....");
    });
}
// Error Handler
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
var PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log("Server running in ".concat(process.env.NODE_ENV, " mode on port ").concat(PORT).yellow.bold);
});
