import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Typography, Avatar } from "@mui/material";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

import { RootState } from "../store/store";
import { getPopupHistory } from "../actions/userAction";
import formatMoney from "../ultis/formatMoney";
import { stringToColor } from "../ultis/stringToColor";
import { getLotteryHistory } from "../actions/lotteryAction";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userInfo, popupHistory } = useSelector(
    (state: RootState) => state.user
  );
  const { lotteryHistory } = useSelector((state: RootState) => state.lottery);

  const totalPopupAmount = popupHistory.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);
  const totalWin = lotteryHistory.reduce((prev, curr) => {
    return prev + curr.win;
  }, 0);

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 100,
        height: 100,
        marginTop: "2rem",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  };

  useEffect(() => {
    dispatch(getPopupHistory());
    dispatch(getLotteryHistory());
  }, [dispatch]);

  return (
    <>
      <Typography component={"h1"} variant={"h2"}>
        Personal Infomation
      </Typography>
      {!userInfo && <CircularProgress />}
      {userInfo && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={userInfo.name}
              src={userInfo.avatar ? userInfo.avatar : ""}
              {...stringAvatar(userInfo.name)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: "2rem",
              backgroundColor: "rgb(231, 235, 240)",
              borderRadius: "10px",
              padding: "3rem",
            }}
          >
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={6} xs={12}>
                <Typography component={"h2"} variant={"h5"}>
                  Name: {userInfo?.name}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography component={"h2"} variant={"h5"}>
                  Email: {userInfo?.email}
                </Typography>{" "}
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography component={"h2"} variant={"h5"}>
                  Current Account: {formatMoney(userInfo!.bankAccount)}
                </Typography>{" "}
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography component={"h2"} variant={"h5"}>
                  Total Popup: {formatMoney(totalPopupAmount)}
                </Typography>{" "}
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography component={"h2"} variant={"h5"}>
                  Total played: {popupHistory.length} game(s)
                </Typography>{" "}
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography component={"h2"} variant={"h5"}>
                  Total Win: {formatMoney(totalWin)}
                </Typography>{" "}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
