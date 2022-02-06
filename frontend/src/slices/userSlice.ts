import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userInfoModel from "./../models/userInfoModels";

interface UserState {
  isLogin: boolean | null;
  userInfo: userInfoModel | null;
  token: string | null;
}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const tokenFromStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")!)
  : null;

const initialState: UserState = {
  isLogin: null,
  userInfo: userInfoFromStorage,
  token: tokenFromStorage,
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
      };
      state.isLogin = true;
      state.token = action.payload.token!;
    },
    userLogout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.isLogin = false;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
