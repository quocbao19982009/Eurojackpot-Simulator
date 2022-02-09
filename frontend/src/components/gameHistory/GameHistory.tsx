import React from "react";
import lotteryGameModel from "../../models/lotteryGameModels";
import GameDetails from "./GameDetails";
import Paper from "@mui/material/Paper";

interface GameHistoryProps {
  lotteryHistory: lotteryGameModel[];
}

const GameHistory = ({ lotteryHistory }: GameHistoryProps) => {
  console.log(lotteryHistory);

  return (
    <div>
      <h2>Your Game Hisotry</h2>
      <Paper
        elevation={16}
        sx={{
          backgroundColor: "rgb(231, 235, 240)",
          padding: "2rem",
          marginTop: "1rem",
        }}
      >
        {lotteryHistory.map((lotteryGame) => (
          <GameDetails
            key={lotteryGame.createdAt.toString()}
            lotteryGame={lotteryGame}
          />
        ))}
      </Paper>
    </div>
  );
};

export default GameHistory;
