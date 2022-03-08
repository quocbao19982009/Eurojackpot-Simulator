import jwt from "jsonwebtoken";
import User from "../models/userModels";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { DataStoreInToken } from "../ultis/generateToken";

const authUser = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      const jwtToken = token.split(" ")[1];

      try {
        const decoded = jwt.verify(
          jwtToken,
          process.env.JWT_SECRET!
        ) as DataStoreInToken;

        const user = await User.findById(decoded.id).select("-password");

        req.user = user;

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
  }
);

export default authUser;
