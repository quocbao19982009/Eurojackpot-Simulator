import React from "react";
import lotteryModel from "../../models/lotteryModels";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import compareLottery from "../../ultis/compareLottery";

interface LotteryTableRowProps {
  index: number;
  lottery: lotteryModel;
  resultLottery: lotteryModel;
}

const LotteryTableRow = ({
  lottery,
  index,
  resultLottery,
}: LotteryTableRowProps) => {
  const hitNumbersArray = compareLottery(lottery, resultLottery);

  const { matchNumber, matchStarNumber } = hitNumbersArray;

  const numberHit = (numberInput: number) => {
    return matchNumber.includes(numberInput);
  };
  const starNumberHit = (numberInput: number) => {
    return matchStarNumber.includes(numberInput);
  };

  const hitsAmount =
    matchStarNumber.length === 0
      ? matchNumber.length
      : `${matchNumber.length} + ${matchStarNumber.length}`;

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Box
          component="ol"
          sx={{
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "1rem",
            alignContent: "flex-end",
          }}
        >
          {lottery.number.map((number) => (
            <Box
              key={`${number}`}
              component="li"
              sx={
                numberHit(number)
                  ? {
                      alignItems: "center",
                      backgroundColor: "#72008c",
                      border: "2px solid transparent",
                      borderRadius: "100%",
                      display: "flex",
                      height: "2rem",
                      justifyContent: "center",
                      width: "2rem",
                      color: "#fff",
                      fontWeight: 500,
                      borderColor: "#72008c",
                    }
                  : {
                      alignItems: "center",
                      border: "2px solid transparent",
                      borderRadius: "100%",
                      display: "flex",
                      height: "2rem",
                      justifyContent: "center",
                      width: "2rem",
                      fontWeight: 500,
                    }
              }
            >
              {number}
            </Box>
          ))}
          <StarIcon></StarIcon>
          {lottery.starNumber.map((number) => (
            <Box
              key={`${number}_star`}
              sx={
                starNumberHit(number)
                  ? {
                      alignItems: "center",
                      backgroundColor: "rgb(255, 207, 18)",
                      border: "2px solid transparent",
                      borderRadius: "100%",
                      display: "flex",
                      height: "2rem",
                      justifyContent: "center",
                      width: "2rem",
                      color: "black",
                      fontWeight: 500,
                      borderColor: "rgb(255, 207, 18)",
                    }
                  : {
                      alignItems: "center",
                      border: "2px solid transparent",
                      borderRadius: "100%",
                      display: "flex",
                      height: "2rem",
                      justifyContent: "center",

                      width: "2rem",
                      fontWeight: 500,
                    }
              }
              component="li"
            >
              {number}
            </Box>
          ))}
        </Box>
      </TableCell>
      <TableCell>{hitsAmount}</TableCell>
    </TableRow>
  );
};

export default LotteryTableRow;
