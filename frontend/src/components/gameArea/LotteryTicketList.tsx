import React from "react";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import LotteryTicketItem from "./LotteryTicketItem";
import { removeLotteryTicket } from "../../actions/lotteryAction";

import { Box } from "@mui/material";
const LotteryTicketList = () => {
  const lotteryTicket = useSelector(
    (state: RootState) => state.lottery.lotteryInput
  );

  const dispatch = useDispatch();
  const removeTicketHandler = (id: string) => {
    dispatch(removeLotteryTicket(id));
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box
        sx={{
          fontWeight: 700,
          lineHeight: "1rem",
          marginBottom: "1rem",
        }}
      >
        <span>{`${lotteryTicket.length} ticket(s)`}</span>
      </Box>
      {lotteryTicket.map((ticket) => (
        <LotteryTicketItem
          key={ticket.id}
          ticket={ticket}
          removeTicketHandler={removeTicketHandler}
        />
      ))}
    </Box>
  );
};

export default LotteryTicketList;
