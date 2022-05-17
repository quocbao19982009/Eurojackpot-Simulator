import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";

import {
  DialogContent,
  Modal,
  Button,
  CircularProgress,
  Typography,
  Dialog,
} from "@mui/material";
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

  const screenWidth = window.innerWidth;

  const handleClose = () => {
    setOpen(false);
  };

  const { isLogin } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.lottery);

  const payHandler = async () => {
    if (!isLogin) {
      navigate("/signin");
      return;
    }

    const resultGame: any = await dispatch(playLottery());

    if (resultGame) {
      setGameResult(resultGame);
      setOpen(true);
    }
    if (!resultGame) {
      setGameResult(null);
      return;
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
        <Box sx={{ borderRight: "1px solid #ebeff5f2", flex: "1 1 auto" }}>
          <LotteryTicketList />
        </Box>
        <Box>
          <LotterySelect payHandler={payHandler} />
        </Box>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Typography component={"h3"} variant={"h5"}>
          Game Result
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <CircularProgress />{" "}
          </Box>
        )}
        {!loading && gameResult && <GameDetails lotteryGame={gameResult!} />}
      </Box>

      <Dialog
        open={screenWidth > 900 && open}
        onClose={handleClose}
        aria-labelledby="result modal"
        aria-describedby="result modal"
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {!gameResult && <CircularProgress />}
        {gameResult && <GameDetails lotteryGame={gameResult!} />}

        <Button variant="contained" onClick={handleClose}>
          <CloseIcon />
        </Button>
      </Dialog>
    </>
  );
};

export default GameScreen;
