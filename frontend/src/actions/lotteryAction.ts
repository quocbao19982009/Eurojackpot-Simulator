import { updateLotteryTickets } from "../slices/lotterySlice";
import lotteryModel from "../models/lotteryModels";

export const addLotteryTicket =
  (lotteryTicket: lotteryModel) => (dispatch: any, getState: any) => {
    const currentLotteryTickets: lotteryModel[] = getState().lotteryInput;

    const updatedLotteryTickets = [...currentLotteryTickets, lotteryTicket];

    dispatch(updateLotteryTickets(updatedLotteryTickets));
  };

export const removeLotteryTicket =
  (id: string) => (dispatch: any, getState: any) => {
    const currentLotteryTickets: lotteryModel[] = getState().lotteryInput;

    const updatedLotteryTickets: lotteryModel[] = currentLotteryTickets.filter(
      (ticket) => ticket.id !== id
    );

    dispatch(updateLotteryTickets(updatedLotteryTickets));
  };
