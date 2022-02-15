import { Box, Typography } from "@mui/material";

import OddsTable from "../components/OddsTable";

const GameRule = () => {
  return (
    <Box marginTop={"1rem"}>
      <Typography component={"h1"} variant={"h2"}>
        Eurojackpot Rules
      </Typography>
      <Box marginTop={"2rem"}>
        <Typography component={"h2"} variant={"h4"}>
          How to play
        </Typography>
        <Typography component={"p"}>
          Players must select five main numbers between 1 and 50.
        </Typography>
        <Typography component={"p"}>
          Players must select two extra Euro numbers between 1 and 10.
        </Typography>
        <Typography component={"p"}>
          Players must purchase their tickets before the close of sales in their
          country before the draw takes place.
        </Typography>
        <Typography component={"p"}>
          Draws are held every time player pay for the ticket.
        </Typography>
      </Box>

      <Box marginTop={"2rem"}>
        {" "}
        <Typography component={"h2"} variant={"h4"}>
          Prize Table
        </Typography>
        {<OddsTable />}
      </Box>
    </Box>
  );
};

export default GameRule;
