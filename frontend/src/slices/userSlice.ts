import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userInfoModel from "./../models/userInfoModels";
import popupHistoryModels from "./../models/popupHistory";

interface UserState {
  isLogin: boolean | null;
  userInfo: userInfoModel | null;
  token: string | null;
  loading: boolean;
  popupHistory: popupHistoryModels[];
}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const isLogin = userInfoFromStorage ? true : false;

const tokenFromStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")!)
  : null;

const initialState: UserState = {
  isLogin: isLogin,
  userInfo: userInfoFromStorage,
  token: tokenFromStorage,
  loading: false,
  popupHistory: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<userInfoModel>) => {
      state.userInfo = {
        name: action.payload.name,
        email: action.payload.email,
        bankAccount: action.payload.bankAccount,
        isAdmin: action.payload.isAdmin,
        avatar: action.payload.avatar,
      };
      state.isLogin = true;
      state.token = action.payload.token!;
      state.loading = false;
    },
    userLogout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.isLogin = false;
    },
    userRequestStart: (state) => {
      state.loading = true;
    },
    userRequestFinish: (state) => {
      state.loading = false;
    },
    userPopupAccount: (state, action: PayloadAction<number>) => {
      state.userInfo!.bankAccount = action.payload;
      state.loading = false;
    },
    userPopupHistory: (state, action: PayloadAction<popupHistoryModels[]>) => {
      state.popupHistory = action.payload;
      state.loading = false;
    },
  },
});

export const {
  userLogin,
  userLogout,
  userRequestStart,
  userRequestFinish,
  userPopupAccount,
  userPopupHistory,
} = userSlice.actions;

export default userSlice.reducer;
