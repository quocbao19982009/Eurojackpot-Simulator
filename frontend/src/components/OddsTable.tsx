import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OddsTable = () => {
  const data = [
    {
      prizeTier: "Match 5 and 2 Euro Numbers",
      odds: "1 in 95,344,200",
      averagePrize: "€34,573,468",
    },
    {
      prizeTier: "Match 5 and 1 Euro Number",
      odds: "1 in 5,959,013",
      averagePrize: "€470,638",
    },
    {
      prizeTier: "Match 5",
      odds: "1 in 3,405,150",
      averagePrize: "€96,134",
    },
    {
      prizeTier: "Match 4 and 2 Euro Numbers",
      odds: "1 in 423,752",
      averagePrize: "€4,072",
    },
    {
      prizeTier: "Match 4",
      odds: "1 in 15,134",
      averagePrize: "€103",
    },
    {
      prizeTier: "Match 2 and 2 Euro Numbers",
      odds: "1 in 672",
      averagePrize: "€21",
    },
    {
      prizeTier: "Match 3 and 1 Euro Number",
      odds: "1 in 602",
      averagePrize: "€17",
    },
    {
      prizeTier: "Match 3",
      odds: "1 in 344",
      averagePrize: "€15",
    },
    {
      prizeTier: "Match 1 and 2 Euro Numbers",
      odds: "1 in 128",
      averagePrize: "€10",
    },
    {
      prizeTier: "Match 2 and 1 Euro Number",
      odds: "1 in 42",
      averagePrize: "€8",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              ":nth-of-type(1n)": {
                backgroundColor: "#f7f9fc",
              },
            }}
          >
            <TableCell align="center">Prize Tier</TableCell>
            <TableCell align="center">Odds of Winning</TableCell>
            <TableCell align="center">Average Prize</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.odds}
              sx={{
                ":nth-of-type(2n)": {
                  backgroundColor: "#f7f9fc",
                },
              }}
            >
              <TableCell align="center">{row.prizeTier}</TableCell>
              <TableCell align="center">{row.odds}</TableCell>
              <TableCell align="center">{row.averagePrize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OddsTable;
