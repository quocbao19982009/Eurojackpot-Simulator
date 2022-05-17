import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/store";
import LotteryTicketItem from "./LotteryTicketItem";
import { removeLotteryTicket } from "../../actions/lotteryAction";

import { Box, Typography } from "@mui/material";
const LotteryTicketList = () => {
  const lotteryTicket = useSelector(
    (state: RootState) => state.lottery.lotteryInput
  );

  const dispatch = useDispatch();
  const removeTicketHandler = (id: string) => {
    dispatch(removeLotteryTicket(id));
  };

  return (
    <Box sx={{ padding: "2rem 2rem 2rem 0" }}>
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
      {lotteryTicket.length === 0 && (
        <Typography>Please add a lottery ticket.</Typography>
      )}
    </Box>
  );
};

export default LotteryTicketList;
