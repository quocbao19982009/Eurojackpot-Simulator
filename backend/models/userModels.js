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

// Hashing the password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    // If the password is not change then just go next
  }

  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
