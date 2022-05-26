import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import generateLottery from "../../ultis/generateLottery";
import { RootState } from "../../store/store";
import NumberBox from "./NumberBox";
import { addLotteryTicket } from "../../actions/lotteryAction";
import lotteryModel from "../../models/lotteryModels";
import StarNumberBox from "./StarNumberBox";

interface LotterySelectProps {
  payHandler: () => void;
}

const LotterySelect = ({ payHandler }: LotterySelectProps) => {
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

  const maxTickets = lotteryTicket.length === 5 ? true : false;

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
    <Box padding="2rem">
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
        <Box
          sx={{
            display: "flex",
            margin: "0 1rem 2rem",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={randomTicketHandler}
            disabled={maxTickets}
            variant="outlined"
            type="button"
            color="secondary"
          >
            <ShuffleOnIcon />
          </Button>

          <Button
            variant="contained"
            type="submit"
            color="secondary"
            disabled={!isDisableButton}
          >
            Add Ticket
          </Button>
        </Box>
      </form>

      <Button
        color="success"
        className="payButton"
        size="large"
        variant="contained"
        fullWidth
        disabled={payButtonDisable}
        onClick={payHandler}
      >
        <span>Pay {payAmount}</span>
      </Button>

      {maxTickets && (
        <p style={{ textAlign: "center" }}>Only 5 tickets per game</p>
      )}
    </Box>
  );
};

export default LotterySelect;
