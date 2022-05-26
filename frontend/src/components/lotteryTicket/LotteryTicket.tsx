import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

import lotteryModel from "../../models/lotteryModels";
interface LotteryTicketProps {
  ticket: lotteryModel;
}

const LotteryTicket = ({ ticket }: LotteryTicketProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        fontWeight: 600,
        justifyContent: "space-between",
        padding: "0.25rem 1rem",
        borderRadius: "0.5rem",
        ":nth-of-type(2n)": {
          backgroundColor: "#f7f9fc",
        },
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {ticket.number.map((number) => (
          <Box
            key={`${ticket.id}_${number}`}
            sx={{
              alignItems: "center",
              backgroundColor: "#fff",
              border: "2px solid transparent",
              borderRadius: "100%",
              display: "flex",
              height: "2rem",
              justifyContent: "center",
              margin: "0.25rem 0.25rem 0.25rem 0",
              width: "2rem",
              borderColor: "#72008c",
            }}
          >
            {number}
          </Box>
        ))}
        <StarIcon sx={{ color: "rgb(255, 207, 18)", width: "2rem" }} />
        {ticket.starNumber.map((number) => (
          <Box
            key={`${ticket.id}_${number}`}
            sx={{
              alignItems: "center",
              backgroundColor: "#fff",
              border: "2px solid transparent",
              borderRadius: "100%",
              display: "flex",
              height: "2rem",
              justifyContent: "center",
              margin: "0.25rem 0.25rem 0.25rem 0",
              width: "2rem",
              borderColor: "rgb(255, 207, 18)",
            }}
          >
            {number}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LotteryTicket;
