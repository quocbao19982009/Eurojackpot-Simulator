import {
  userLogin,
  userLogout,
  userRequestStart,
  userRequestFinish,
  userPopupAccount,
  userPopupHistory,
} from "../slices/userSlice";
import { createAlert } from "./alertAction";

import axios from "axios";

enum severity {
  error = "error",
  success = "success",
  warning = "warning",
}

export const signUp =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch(userRequestStart());
      const { data } = await axios.post("/api/users/", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch(userRequestFinish());
      dispatch(userLogin(data));
    } catch (error: any) {
      dispatch(userRequestFinish());
      dispatch(createAlert(error.response.data.message));
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch(userRequestStart());

      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin,
          bankAccount: data.bankAccount,
        })
      );

      dispatch(userLogin(data));
    } catch (error: any) {
      dispatch(userRequestFinish());
      dispatch(createAlert(error.response.data.message));
    }
  };

export const logout = () => (dispatch: any) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch(userLogout());
};

export const loginWithGoogle =
  (email: string, name: string, googleID: string, avatar: string) =>
  async (dispatch: any) => {
    try {
      const { data } = await axios.post("/api/users/googlelogin", {
        name,
        email,
        googleID,
        avatar,
      });

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin,
          bankAccount: data.bankAccount,
          avatar: data.avatar,
        })
      );
      dispatch(userLogin(data));
    } catch (error: any) {
      dispatch(userRequestFinish());
      dispatch(createAlert(error.response.data.message));
    }
  };

export const popupAccount =
  (amountInput: number) => async (dispatch: any, getState: any) => {
    try {
      dispatch(userRequestStart());

      const token = getState().user.token;
      const user = getState().user.userInfo;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        amount: amountInput,
      };

      const { data } = await axios.post("/api/users/transaction", body, config);

      const updateBankAccount = data.bankAccount;

      dispatch(userPopupAccount(updateBankAccount));

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          bankAccount: updateBankAccount,
          avatar: user.avatar ? user.avatar : null,
        })
      );
      dispatch(
        createAlert(
          "Your Account has been successfuly popup!",
          severity.success
        )
      );
    } catch (error: any) {
      dispatch(userRequestFinish());
      dispatch(createAlert(error.response.data.message));
    }
  };

export const getPopupHistory = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(userRequestStart());

    const token = getState().user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/users/transaction", config);

    dispatch(userPopupHistory(data));
  } catch (error: any) {
    dispatch(userRequestFinish());
    dispatch(createAlert(error.response.data.message));
  }
};
