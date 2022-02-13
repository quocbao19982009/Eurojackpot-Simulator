import React from "react";
import { Typography, Box, Dialog, DialogContent } from "@mui/material";
import GameDetails from "./gameHistory/GameDetails";
import lotteryGameModel from "../models/lotteryGameModels";
import Modal from "@mui/material/Modal";

interface GameResultProps {
  open: boolean;
  handleClose: () => void;
  lotteryResult: lotteryGameModel;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GameResult = ({ open, handleClose, lotteryResult }: GameResultProps) => {
  return (
    <Dialog
      open={open}
      onClick={() => console.log("click on modal")}
      sx={{
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DialogContent>
        <GameDetails lotteryGame={lotteryResult}></GameDetails>
      </DialogContent>
    </Dialog>
  );
};

export default GameResult;
