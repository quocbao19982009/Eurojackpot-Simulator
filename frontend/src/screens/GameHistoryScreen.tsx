import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { getLotteryHistory } from "../actions/lotteryAction";
import GameHistory from "../components/gameHistory/GameHistory";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const GameHistoryScreen = () => {
  const dispatch = useDispatch();
  const { lotteryHistory, loading } = useSelector(
    (state: RootState) => state.lottery
  );

  console.log("loading in history", loading);
  useEffect(() => {
    dispatch(getLotteryHistory());
  }, []);

  return (
    <>
      <Typography component={"h1"} variant={"h1"}>
        Game History
      </Typography>

      <Box sx={{ marginTop: "1rem" }}>
        {lotteryHistory.length === 0 && (
          <Typography component={"h3"} variant={"h6"}>
            You haven't play any game
          </Typography>
        )}
        {lotteryHistory.length !== 0 && (
          <GameHistory lotteryHistory={lotteryHistory} />
        )}
      </Box>
    </>
  );
};

export default GameHistoryScreen;
