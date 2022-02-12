import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

interface TransactionTableProps {
  popupHistory: {
    amount: number;
    paidAt: string;
    _id: string;
  }[];
}

const TransactionTable = ({ popupHistory }: TransactionTableProps) => {
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">{"Amount (Euros)"} </TableCell>
          <TableCell align="center">Paid At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {popupHistory.map((popup) => (
          <TableRow
            key={popup._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{popup.amount}</TableCell>
            <TableCell align="center">{popup.paidAt.slice(0, 10)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
