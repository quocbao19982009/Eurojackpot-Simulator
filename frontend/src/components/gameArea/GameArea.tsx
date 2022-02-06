import React from "react";
import classes from "./GameArea.module.css";
import LotteryTicketList from "./LotteryTicketList";
import LotterySelect from "../numberbox/LotterySelect";
const GameArea = () => {
  return (
    <>
      <h1>Basic Game</h1>
      <div className={classes.gameArea}>
        <div className={classes.tickets}>
          <LotteryTicketList />
        </div>
        <div className={classes.selection}>
          <LotterySelect />
        </div>
      </div>
    </>
  );
};

export default GameArea;
