import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "../App.css";
function FlightStatus({ isLoggedIn, credentials }) {
  const [result, setResult] = useState(null);
  async function search(event) {
    event.preventDefault();
    const url = "http://localhost:8080/api/flight/get_all";
    console.log(url);
    await axios
      .get(url, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      });
  }
  return (
    <div className="Main">
      {isLoggedIn ? (
        <div className="">
          <h1 className="title">Flight Status</h1>
          <Button
            variant="contained"
            sx={{ marginleft: "10px", marginBottom: "30px" }}
            onClick={search}
          >
            view
          </Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Flight model</TableCell>
                  <TableCell align="left">Remaining Business Seats</TableCell>
                  <TableCell align="left">Remaining Economy Seats</TableCell>
                  <TableCell align="left">Remaining Premium Seats</TableCell>
                </TableRow>
              </TableHead>
              {result !== null
                ? result.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
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
                    </TableRow>
                  ))
                : ""}
            </Table>
          </TableContainer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default FlightStatus;
