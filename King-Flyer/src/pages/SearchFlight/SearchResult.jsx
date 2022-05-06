import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import "./Search.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result, isLoggedIn }) => {
  let navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Departure</TableCell>
            <TableCell align="left">Arrival</TableCell>
            <TableCell align="left">
              Flight
              <br />
              Model
            </TableCell>
            <TableCell align="left">
              Business Seats
              <br />
              (remaining)
            </TableCell>
            <TableCell align="left">
              Economy Seats
              <br />
              (remaining)
            </TableCell>
            <TableCell align="left">
              Premium Seats
              <br />
              (remaining)
            </TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.departureLocation}
              </TableCell>
              <TableCell align="left">{row.arrivalLocation}</TableCell>
              <TableCell align="left">
                {row.fleet.model}
                <br />
                {row.fleet.code}
              </TableCell>
              <TableCell align="left">
                {row.status.remainingBusinessSeats}
              </TableCell>
              <TableCell align="left">
                {row.status.remainingEconomySeats}
              </TableCell>
              <TableCell align="left">
                {row.status.remainingPremiumSeats}
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/view_flight/${row.id}`);
                  }}
                >
                  View
                </Button>
                <Button
                  id="resbtn"
                  variant="contained"
                  size="small"
                  color="success"
                  onClick={(event) => {
                    event.preventDefault();
                    isLoggedIn
                      ? navigate(
                          `/book_flight/id=${row.id}&d=${row.departureLocation}&a=${row.arrivalLocation}`
                        )
                      : navigate("/login");
                  }}
                >
                  Book
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResult;
