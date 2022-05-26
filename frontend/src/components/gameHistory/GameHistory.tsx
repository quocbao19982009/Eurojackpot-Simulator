import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";

import lotteryGameModel from "../../models/lotteryGameModels";
import GameDetails from "./GameDetails";

interface GameHistoryProps {
  lotteryHistory: lotteryGameModel[];
}

const GameHistory = ({ lotteryHistory }: GameHistoryProps) => {
  let sortedLottery: lotteryGameModel[] = [];

  const [sortBy, setSortBy] = useState("new");

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  if (sortBy === "old") {
    sortedLottery = [...lotteryHistory].sort(function (a, b) {
      return +new Date(a.createdAt) - +new Date(b.createdAt);
    });
  }
  if (sortBy === "new") {
    sortedLottery = [...lotteryHistory].sort(function (a, b) {
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
  }

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
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="sortBy">Sort By</InputLabel>
            <Select
              labelId="sortBySelect"
              id="sortBySelect"
              value={sortBy}
              label="Sort By"
              onChange={handleChange}
            >
              <MenuItem value={"new"}>Newest</MenuItem>
              <MenuItem value={"old"}>Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {sortedLottery.map((lotteryGame) => (
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
