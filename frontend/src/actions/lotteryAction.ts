import axios from "axios";

import {
  updateLotteryTickets,
  updateLotteryHistory,
  lotteryRequestStart,
  lotteryRequestFinish,
  resetLotteryTickets,
} from "../slices/lotterySlice";
import { userPopupAccount } from "../slices/userSlice";
import lotteryModel from "../models/lotteryModels";
import { createAlert } from "./alertAction";

export const addLotteryTicket =
  (lotteryTicket: lotteryModel) => (dispatch: any, getState: any) => {
    const currentLotteryTickets: lotteryModel[] =
      getState().lottery.lotteryInput;

    const updatedLotteryTickets = [...currentLotteryTickets, lotteryTicket];

    dispatch(updateLotteryTickets(updatedLotteryTickets));
  };

export const removeLotteryTicket =
  (id: string) => (dispatch: any, getState: any) => {
    const currentLotteryTickets: lotteryModel[] =
      getState().lottery.lotteryInput;

    const updatedLotteryTickets: lotteryModel[] = currentLotteryTickets.filter(
      (ticket) => ticket.id !== id
    );

    dispatch(updateLotteryTickets(updatedLotteryTickets));
  };

export const getLotteryHistory = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(lotteryRequestStart());

    const token = getState().user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/lottery/history", config);

    dispatch(updateLotteryHistory(data));
  } catch (error: any) {
    dispatch(lotteryRequestFinish());
    dispatch(createAlert(error.response.data.message));
  }
};

export const playLottery = () => async (dispatch: any, getState: any) => {
  try {
    dispatch(lotteryRequestStart());

    const token = getState().user.token;
    const user = getState().user.userInfo;
    const { lotteryInput } = getState().lottery;
    const body = {
      playLottery: lotteryInput,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/api/lottery/play", body, config);

    const updateBankAccount = data.bankAccount;

    dispatch(userPopupAccount(updateBankAccount));

    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        bankAccount: updateBankAccount,
        avatar: user.avatar ? user.avatar : "",
      })
    );
    dispatch(resetLotteryTickets());
    dispatch(lotteryRequestFinish());
    return data.gameHistory[0];
  } catch (error: any) {
    dispatch(lotteryRequestFinish());
    dispatch(createAlert(error.response.data.message));
  }
};
