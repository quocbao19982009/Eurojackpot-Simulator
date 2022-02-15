import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

import { DialogContent, Modal, Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

import { playLottery } from "../actions/lotteryAction";
import lotteryGameModel from "../models/lotteryGameModels";
import GameDetails from "../components/gameHistory/GameDetails";
import LotteryTicketList from "../components/gameArea/LotteryTicketList";
import LotterySelect from "../components/numberbox/LotterySelect";

const GameScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<lotteryGameModel | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const { isLogin } = useSelector((state: RootState) => state.user);

  const payHandler = async () => {
    if (!isLogin) {
      navigate("/signin");
      return;
    }

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
      <Box
        sx={{
          display: "flex",
          margin: "0 2rem",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
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
