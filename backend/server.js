import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);