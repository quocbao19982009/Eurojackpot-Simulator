import {
  updateLotteryTickets,
  updateLotteryHistory,
  lotteryRequestStart,
  lotteryRequestFinish,
} from "../slices/lotterySlice";
import lotteryModel from "../models/lotteryModels";
import { createAlert } from "./alertAction";
import axios from "axios";

export const addLotteryTicket =
  (lotteryTicket: lotteryModel) => (dispatch: any, getState: any) => {
    const currentLotteryTickets: lotteryModel[] =
      getState().lottery.lotteryInput;
    const updatedLotteryTickets = [...currentLotteryTickets, lotteryTicket];
    console.log(getState().lottery.lotteryInput);

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
