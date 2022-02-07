import { userLogin, userLogout } from "../slices/userSlice";
import userInfoModel from "../models/userInfoModels";
import axios from "axios";

export const signUp =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
      const { data } = await axios.post("/api/users/", {
        name,
        email,
        password,
      });

      console.log("data", data);

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(userLogin(data));
    } catch (error) {
      console.error(error);
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
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
      console.log(error.response.data);
    }
  };

export const logout = () => (dispatch: any) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch(userLogout());
};
