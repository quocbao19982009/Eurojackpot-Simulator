import React, { useEffect, useState } from "react";

import { Typography, Box, Popover } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";

import { PayPalButton } from "react-paypal-button-v2";

import { useDispatch, useSelector } from "react-redux";

import { popupAccount } from "../actions/userAction";
import TransactionTable from "../components/transactionHistory/TransactionTable";
import { RootState } from "../store/store";
import { getPopupHistory } from "../actions/userAction";

const TransitionScreen = () => {
  const dispatch = useDispatch();
  const [successPopup, setSuccessPopup] = useState<boolean>(false);
  const [popupAmount, setPopupAmount] = useState<string>("10");

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { popupHistory } = useSelector((state: RootState) => state.user);

  const sortedPopupHistory = [...popupHistory].sort(function (a, b) {
    return +new Date(b.paidAt) - +new Date(a.paidAt);
  });

  const popOver = (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2 }}>
        Email: sb-kpxgl13820173@personal.example.com{" "}
      </Typography>
      <Typography sx={{ p: 2 }}>Password: Eurojackpot123 </Typography>
    </Popover>
  );

  useEffect(() => {
    dispatch(getPopupHistory());
    setSuccessPopup(false);
  }, [successPopup, dispatch]);

  return (
    <div>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Money Transfer
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Topup your account in a fast and furious way with PayPal transition.
          Use a sandbox Paypal Account{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            aria-describedby={id}
            onClick={handleClick}
          >
            here.
          </span>
          {popOver}
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Typography
          component="h3"
          variant="h4"
          color="text.primary"
          gutterBottom
          textAlign="center"
        >
          Select Amount
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            flexGrow: "1",
          }}
          component={"form"}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Amount Topup
            </FormLabel>
            <RadioGroup
              aria-labelledby="Popup Amount"
              defaultValue="10"
              value={popupAmount}
              name="radio-buttons-group"
              onChange={(e) => {
                setPopupAmount(e.target.value);
              }}
            >
              <FormControlLabel
                value="10"
                control={<Radio />}
                label="10 Euros"
              />
              <FormControlLabel
                value="20"
                control={<Radio />}
                label="20 Euros"
              />
              <FormControlLabel
                value="50"
                control={<Radio />}
                label="50 Euros"
              />
              <FormControlLabel
                value="100"
                control={<Radio />}
                label="100 Euros"
              />
            </RadioGroup>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexGrow: "1",
            }}
          >
            <PayPalButton
              amount={popupAmount}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details: any, data: any) => {
                dispatch(popupAccount(+popupAmount));
                setSuccessPopup(true);
              }}
            />
          </Box>
        </Box>
        <Box
          component={"div"}
          sx={{
            borderTop: "1px solid black",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <Typography
            component="h3"
            variant="h4"
            color="text.primary"
            gutterBottom
            textAlign="center"
          >
            Topup History
          </Typography>
          {popupHistory.length === 0 && (
            <Typography variant="h4" component={"h4"} textAlign="center">
              No History Transition
            </Typography>
          )}
          {popupHistory.length > 0 && (
            <TransactionTable popupHistory={sortedPopupHistory} />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default TransitionScreen;
