import {
  userLogin,
  userLogout,
  userRequestStart,
  userRequestFinish,
  userPopupAccount,
} from "../slices/userSlice";
import { createAlert } from "./alertAction";
import userInfoModel from "../models/userInfoModels";
import axios from "axios";

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

      console.log("data", data);

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

      console.log("data", data);

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

// export const getUserDetails = () => async (dispatch: any, getState: any) => {
//   try {
//     dispatch(userRequestStart());

//     const token = getState().user.token;

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await axios.get("/api/users/profile", config);

//     dispatch(userLogin(data));
//   } catch (error: any) {
//     dispatch(userRequestFinish());
//     dispatch(createAlert(error.response.data.message));
//   }
// };

export const popupAccount =
  (amountInput: number) => async (dispatch: any, getState: any) => {
    try {
      dispatch(userRequestStart());

      const token = getState().user.token;

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

      console.log(data);

      const userBankAccount = data.bankAccount;

      dispatch(userPopupAccount(userBankAccount));
    } catch (error: any) {
      dispatch(userRequestFinish());
      dispatch(createAlert(error.response.data.message));
    }
  };
