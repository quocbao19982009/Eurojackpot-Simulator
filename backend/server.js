import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import lotteryRoutes from "./routes/lotteryRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
dotenv.config();

const app = express();

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

// User Routes
app.use("/api/users", userRoutes);

// Lottery Routes
app.use("/api/lottery", lotteryRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
