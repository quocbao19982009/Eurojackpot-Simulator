import mongoose from "mongoose";
import gameSchema from "./gameSchema.js";
import bycrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  gameHistory: [gameSchema],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {});

const User = mongoose.model("User", userSchema);

export default User;
