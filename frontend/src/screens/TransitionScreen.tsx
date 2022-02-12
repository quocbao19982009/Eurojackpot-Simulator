import React, { useState } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch } from "react-redux";
import { popupAccount } from "../actions/userAction";
const TransitionScreen = () => {
  const dispatch = useDispatch();
  const [popupAmount, setPopupAmount] = useState<string>("10");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(popupAmount);
  };

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
            variant="h5"
            color="text.primary"
            gutterBottom
          >
            Select Amount
          </Typography>
          <Box component={"form"} onSubmit={handleSubmit}>
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
            <PayPalButton
              amount={popupAmount}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details: any, data: any) => {
                dispatch(popupAccount(+popupAmount));
              }}
            />
          </Box>
        </Container>
      </Paper>
    </div>
  );
};

export default TransitionScreen;
