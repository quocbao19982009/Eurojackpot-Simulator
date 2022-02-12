import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../ultis/generateToken.js";

// @desc    Register user
// @route   POST /api/users/
// @access  Public

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("Email is used. Choose another email.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      bankAccount: user.bankAccount,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Login user & token sent
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
  const matchPassword = await user.matchPassword(password);

  if (user && matchPassword) {
    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      bankAccount: user.bankAccount,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Get User's Profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    res.json(user);
  }

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Sign up with google
// @route   POST /api/users/googlelogin
// @access  Public
const loginWithGoogle = asyncHandler(async (req, res) => {
  const { name, email, googleID, avatar } = req.body;

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(200).json({
      _id: userExits._id,
      name: userExits.name,
      email: userExits.email,
      isAdmin: userExits.isAdmin,
      avatar: userExits.avatar,
      bankAccount: userExits.bankAccount,
      token: generateToken(userExits._id),
    });
  }
  if (!userExits) {
    const user = await User.create({
      name,
      email,
      password: googleID,
      avatar,
    });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        bankAccount: user.bankAccount,
        token: generateToken(user._id),
      });
    }
  }
});

// @desc    Popup account with paypal
// @route   POST /api/users/transaction
// @access  Priavte

const popupAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { amount } = req.body;

  if (!amount) {
    res.status(401);
    throw new Error("A minimum amount of 10 Euros is requrired");
  }

  if (user) {
    user.bankAccount = user.bankAccount + amount;
    user.transaction.push({
      amount: amount,
      paidAt: Date.now(),
    });
  }

  const updatedUser = await user.save();

  res.json({
    bankAccount: updatedUser.bankAccount,
  });
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  loginWithGoogle,
  popupAccount,
};
