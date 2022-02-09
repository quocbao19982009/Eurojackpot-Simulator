import { ClassNames } from "@emotion/react";
import React from "react";
import lotteryModel from "../../models/lotteryModels";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import LotteryTicket from "../lotteryTicket/LotteryTicket";
interface LotteryTicketItem {
  ticket: lotteryModel;
  removeTicketHandler: (id: string) => void;
}

const LotteryTicketItem = ({
  ticket,
  removeTicketHandler,
}: LotteryTicketItem) => {
  return (
    <Box
      sx={{
        display: "flex",
        fontWeight: 600,
        justifyContent: "space-between",
        padding: "0.25rem 1rem",
        borderRadius: "0.5rem",
        ":nth-of-type(2n)": {
          backgroundColor: "#f7f9fc",
        },
      }}
    >
      <LotteryTicket ticket={ticket} />
      <IconButton onClick={() => removeTicketHandler(ticket.id)}>
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
};

export default LotteryTicketItem;
