import React from "react";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import LotteryTicketItem from "./LotteryTicketItem";
import { removeLotteryTicket } from "../../actions/lotteryAction";
import classes from "./LotteryTicketList.module.css";
const LotteryTicketList = () => {
  const lotteryTicket = useSelector(
    (state: RootState) => state.lottery.lotteryInput
  );

  const dispatch = useDispatch();
  const removeTicketHandler = (id: string) => {
    dispatch(removeLotteryTicket(id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.label}>
        <span>{`${lotteryTicket.length} ticket(s)`}</span>
      </div>
      {lotteryTicket.map((ticket) => (
        <LotteryTicketItem
          ticket={ticket}
          removeTicketHandler={removeTicketHandler}
        />
      ))}
    </div>
  );
};

export default LotteryTicketList;
