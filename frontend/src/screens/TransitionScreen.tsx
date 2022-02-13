import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
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
import axios from "axios";

const TransitionScreen = () => {
  const dispatch = useDispatch();
  const [successPopup, setSuccessPopup] = useState<boolean>(false);
  const [popupAmount, setPopupAmount] = useState<string>("10");

  const { popupHistory, loading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getPopupHistory());
    setSuccessPopup(false);
  }, [successPopup]);

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
          Popup your account in a fast and furious way with PayPal transition.
        </Typography>
      </Container>
      <Paper elevation={1}>
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
                Amount Popup
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
              Popup History
            </Typography>
            {popupHistory.length === 0 && (
              <Typography variant="h4" component={"h4"} textAlign="center">
                No History Transition
              </Typography>
            )}
            {popupHistory.length > 0 && (
              <TransactionTable popupHistory={popupHistory} />
            )}
          </Box>
        </Container>
      </Paper>
    </div>
  );
};

export default TransitionScreen;
