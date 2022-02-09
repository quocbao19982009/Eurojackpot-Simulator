import React from "react";
import dateFormat from "../../ultis/dateFormat";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import lotteryGameModel from "../../models/lotteryGameModels";
import LotteryTicket from "../lotteryTicket/LotteryTicket";
import LotteryTable from "./LotteryTable";

interface GameDetailsProps {
  lotteryGame: lotteryGameModel;
}

const GameDetails = ({ lotteryGame }: GameDetailsProps) => {
  console.log("lotteryGame", lotteryGame);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignContent: "center",
          }}
        >
          <Typography alignSelf={"center"}>Eurojackpot</Typography>
          <Box>
            <Typography>
              Price <strong>{lotteryGame.lotteryCost}.00 €</strong>
            </Typography>
            <Typography>
              Draw <strong>{dateFormat(lotteryGame.createdAt)}</strong>
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Result</Typography>
        <LotteryTicket ticket={lotteryGame.resultLottery} />
        <Typography>THE LINES YOU'RE PLAYING</Typography>
        <LotteryTable
          playLottery={lotteryGame.playLottery}
          resultLottery={lotteryGame.resultLottery}
        />
        <Typography sx={{ marginTop: "1rem" }}>
          <strong>Your Profit: {lotteryGame.win}.00 €</strong>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default GameDetails;
