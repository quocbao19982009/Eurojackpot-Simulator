import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import lotteryModel from "../../models/lotteryModels";
import LotteryTicket from "../lotteryTicket/LotteryTicket";
interface LotteryTicketItemProps {
  ticket: lotteryModel;
  removeTicketHandler: (id: string) => void;
}

const LotteryTicketItem = ({
  ticket,
  removeTicketHandler,
}: LotteryTicketItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        fontWeight: 600,
        justifyContent: "space-between",
        borderRadius: "0.5rem",
        ":nth-of-type(2n)": {
          backgroundColor: "#f7f9fc",
        },
      }}
    >
      <LotteryTicket ticket={ticket} />
      <IconButton onClick={() => removeTicketHandler(ticket.id)}>
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
};

export default LotteryTicketItem;
