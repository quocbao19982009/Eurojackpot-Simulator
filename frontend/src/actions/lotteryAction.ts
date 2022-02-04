import { updateLotteryTickets } from "../slices/lotterySlice";
import lotteryModel from "../models/lotteryModels";

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
