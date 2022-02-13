import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { getLotteryHistory } from "../actions/lotteryAction";
import GameHistory from "../components/gameHistory/GameHistory";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { getPopupHistory } from "../actions/userAction";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {
    isLogin,
    userInfo,
    popupHistory,
    loading: loadingUser,
  } = useSelector((state: RootState) => state.user);
  const { lotteryHistory, loading: loadingLottery } = useSelector(
    (state: RootState) => state.lottery
  );

  const totalPopupAmount = popupHistory.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);
  const totalWin = lotteryHistory.reduce((prev, curr) => {
    return prev + curr.win;
  }, 0);

  useEffect(() => {
    dispatch(getPopupHistory());
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
      <Typography component={"h2"} variant={"h5"}>
        Total Popup: {`${totalPopupAmount}.00 € `}
      </Typography>
      <Typography component={"h2"} variant={"h5"}>
        Total Win: {`${totalWin}.00 € `}
      </Typography>
    </>
  );
};

export default ProfileScreen;
