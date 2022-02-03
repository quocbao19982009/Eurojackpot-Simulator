import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    const jwtToken = token.split(" ")[1];
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      req.user = user;
      console.log(decoded);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token fail");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No Token Found");
  }
});

export default authUser;
