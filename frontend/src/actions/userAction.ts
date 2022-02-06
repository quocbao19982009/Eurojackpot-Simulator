import { userLogin, userLogout } from "../slices/userSlice";
import userInfoModel from "../models/userInfoModels";
import useFetch from "../hooks/useFetch";
import axios from "axios";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      console.log("data", data);

      dispatch(userLogin(data));
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
