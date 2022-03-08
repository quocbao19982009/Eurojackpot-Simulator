import mongoose from "mongoose";
import gameSchema from "./gameSchema";
import bycrypt from "bcryptjs";

import { GameInterface } from "./gameSchema";

export interface UserInterface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  bankAccount: number;
  isAdmin: boolean;
  gameHistory: GameInterface[];
  avatar?: string;
  transaction: { amount: number; paidAt: Date | number }[];
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // If user login with Google, use Google ID as password
  },

  bankAccount: {
    type: Number,
    default: 100,
    min: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  gameHistory: [gameSchema],
  avatar: String,
  transaction: [
    {
      amount: { type: Number, required: true, min: 10 },
      paidAt: Date,
    },
  ],
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bycrypt.compare(enteredPassword, this.password);
};

// Hashing the password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    // If the password is not change then just go next
  }

  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const User = mongoose.model<UserInterface>("User", userSchema);

export default User;
