import { ClassNames } from "@emotion/react";
import React from "react";
import lotteryModel from "../../models/lotteryModels";
import classes from "./LotteryTicketItem.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";

interface LotteryTicketItem {
  ticket: lotteryModel;
  removeTicketHandler: (id: string) => void;
}

const LotteryTicketItem = ({
  ticket,
  removeTicketHandler,
}: LotteryTicketItem) => {
  return (
    <div className={classes.row}>
      <div className={classes.rowNumber}>
        {ticket.number.map((number) => (
          <div className={classes.number}>{number}</div>
        ))}

        {ticket.starNumber.map((number) => (
          <div className={classes.starNumber}>{number}</div>
        ))}
      </div>
      <IconButton onClick={() => removeTicketHandler(ticket.id)}>
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
};

export default LotteryTicketItem;
