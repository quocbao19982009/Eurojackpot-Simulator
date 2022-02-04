import React, { useState } from "react";
import NumberBox from "./NumberBox";
import StarNumberBox from "./StarNumberBox";
import { Button } from "@mui/material";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import { useDispatch, useSelector } from "react-redux";
import lotteryModel from "../../models/lotteryModels";
import { addLotteryTicket } from "../../actions/lotteryAction";
import { v4 as uuidv4 } from "uuid";
import classes from "./LotterySelect.module.css";
import generateLottery from "../../ultis/generateLottery";
import { RootState } from "../../store/store";
import { deepPurple } from "@mui/material/colors";

const LotterySelect = () => {
  const [lotteryNumber, setLotteryNumber] = useState<number[]>([]);
  const [maxNumber, setMaxNumber] = useState<boolean>(false);

  const [starNumber, setStarNumber] = useState<number[]>([]);
  const [maxStarNumber, setMaxStarNumber] = useState<boolean>(false);

  const lotteryTicket = useSelector(
    (state: RootState) => state.lottery.lotteryInput
  );

  const dispatch = useDispatch();

  const payAmount = `${lotteryTicket.length * 2}.00 €`;
  const payButtonDisable = lotteryTicket.length === 0 ? true : false;

  const maxTickets = lotteryTicket.length === 10 ? true : false;

  const isDisableButton = maxNumber && maxStarNumber && !maxTickets;

  const sumbitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const lotteryTicket: lotteryModel = {
      number: lotteryNumber.sort((a, b) => a - b),
      starNumber: starNumber.sort((a, b) => a - b),
      id: uuidv4(),
    };

    // Add ticket to Redux
    if (maxNumber && maxStarNumber) {
      dispatch(addLotteryTicket(lotteryTicket));

      // Reset
      setLotteryNumber([]);
      setMaxNumber(false);
      setStarNumber([]);
      setMaxStarNumber(false);
    }
  };

  const randomTicketHandler = () => {
    const randomTicket = generateLottery();
    dispatch(addLotteryTicket(randomTicket));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={sumbitHandler}>
        <NumberBox
          lotteryNumber={lotteryNumber}
          setLotteryNumber={setLotteryNumber}
          maxNumber={maxNumber}
          setMaxNumber={setMaxNumber}
          maxTickets={maxTickets}
        />
        <StarNumberBox
          starNumber={starNumber}
          setStarNumber={setStarNumber}
          maxStarNumber={maxStarNumber}
          setMaxStarNumber={setMaxStarNumber}
          maxTickets={maxTickets}
        />
        <div className={classes.actions}>
          <div className={classes.randomButton}>
            <Button
              onClick={randomTicketHandler}
              disabled={maxTickets}
              variant="outlined"
              type="button"
              color="secondary"
            >
              <ShuffleOnIcon />
            </Button>
          </div>
          <div className={classes.addButton}>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              disabled={!isDisableButton}
            >
              Add Ticket
            </Button>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            color="success"
            className={classes.payButton}
            size="large"
            variant="contained"
            disabled={payButtonDisable}
          >
            <span>Pay {payAmount}</span>
          </Button>
        </div>
      </form>
      {maxTickets && (
        <p style={{ textAlign: "center" }}>Only 10 tickets per game</p>
      )}
    </div>
  );
};

export default LotterySelect;
