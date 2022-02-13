import React, { useState } from "react";
import Container from "../components/layout/Container";
import GameArea from "../components/gameArea/GameArea";
import LotteryTicketList from "../components/gameArea/LotteryTicketList";
import LotterySelect from "../components/numberbox/LotterySelect";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { playLottery } from "../actions/lotteryAction";
import GameResult from "../components/GameResult";
import { boolean } from "yup/lib/locale";
import lotteryGameModel from "../models/lotteryGameModels";
import {
  Backdrop,
  Dialog,
  DialogContent,
  Modal,
  DialogTitle,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import GameDetails from "../components/gameHistory/GameDetails";

import CloseIcon from "@mui/icons-material/Close";
const GameScreen = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<lotteryGameModel | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const lotteryInput = useSelector(
    (state: RootState) => state.lottery.lotteryInput
  );

  const payHandler = async () => {
    setOpen(true);
    const resultGame: any = await dispatch(playLottery());
    console.log(resultGame);

    if (resultGame) {
      console.log("running");
      setGameResult(resultGame);
    }
  };

  return (
    <>
      <h1>Basic Game</h1>
      <Box sx={{ display: "flex", margin: "0 2rem" }}>
        <Box sx={{ borderRight: "1px solid #ebeff5", flex: "1 1 auto" }}>
          <LotteryTicketList />
        </Box>
        <Box>
          <LotterySelect payHandler={payHandler} />
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <DialogContent
          sx={{
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {!gameResult && <CircularProgress />}
          {gameResult && <GameDetails lotteryGame={gameResult!} />}
          {
            <Button variant="contained" onClick={handleClose}>
              <CloseIcon />
            </Button>
          }
        </DialogContent>
      </Modal>
    </>
  );
};

export default GameScreen;
