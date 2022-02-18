import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import formatMoney from "../../ultis/formatMoney";

interface TransactionTableProps {
  popupHistory: {
    amount: number;
    paidAt: string;
    _id: string;
  }[];
}

const TransactionTable = ({ popupHistory }: TransactionTableProps) => {
  return (
    <Table sx={{}} aria-label="simple table">
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
            <TableCell align="center">{formatMoney(popup.amount)}</TableCell>
            <TableCell align="center">{popup.paidAt.slice(0, 10)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
