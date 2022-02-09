import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { getLotteryHistory } from "../actions/lotteryAction";
import GameHistory from "../components/gameHistory/GameHistory";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.user);
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
        Personal Infomation
      </Typography>

      <Typography component={"h2"} variant={"h5"}>
        Name: {userInfo?.name}
      </Typography>
      <Typography component={"h2"} variant={"h5"}>
        Email: {userInfo?.email}
      </Typography>
      <Typography component={"h2"} variant={"h5"}>
        Current Account: {`${userInfo?.bankAccount}.00 € `}
      </Typography>
      <Box sx={{ marginTop: "1rem" }}>
        {lotteryHistory.length !== 0 && (
          <GameHistory lotteryHistory={lotteryHistory} />
        )}
      </Box>
    </>
  );
};

export default ProfileScreen;
