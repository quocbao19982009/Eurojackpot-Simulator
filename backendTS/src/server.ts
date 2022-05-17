import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db";
import path from "path";
import "colors";
import userRoutes from "./routes/userRoutes";
import lotteryRoutes from "./routes/lotteryRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";
dotenv.config();

const app = express();

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);

// Lottery Routes
app.use("/api/lottery", lotteryRoutes);

console.log(__dirname);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error Handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
