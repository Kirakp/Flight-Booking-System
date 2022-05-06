import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
function BookedTickets({ isLoggedIn, credentials }) {
  let navigate = useNavigate();

  const username = credentials.username;
  const [bookingResult, setbookingResult] = useState(null);

  async function fetchBookingData(event) {
    event.preventDefault();
    const url =
      "http://localhost:8080/api/booking/get_users_booking?username=" +
      username;
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
        setbookingResult(res.data);
        console.log(res.data.departureLocation, ":", res.data.arrivalLocation);
      });
  }

  async function cancelBooking(e, id, index) {
    e.preventDefault();
    const url = "http://localhost:8080/api/booking/cancel_booking?id=" + id;
    console.log(url);
    await axios
      .delete(url, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.access_token}`,
        },
      })
      .then((res) => {
        console.log(res.status);
        const filtered = [...bookingResult];
        filtered.splice(index, 1);
        setbookingResult(filtered);
      });
  }

  return (
    <div className="Main">
      <h1 className="title">
        BookedTickets of {credentials.username !== "" ? credentials.username : ""}
      </h1>
      <Button
        variant="contained"
        sx={{ marginleft: "10px", marginBottom: "30px" }}
        onClick={fetchBookingData}
      >
        view
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Departure</TableCell>
              <TableCell align="left">Arrival</TableCell>
              <TableCell align="left"># tickets</TableCell>
              <TableCell align="left">CLass</TableCell>
              <TableCell align="left">Travell Date</TableCell>
              <TableCell align="left">Total Cost</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingResult !== null
              ? bookingResult.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.departureLocation}
                    </TableCell>
                    <TableCell align="left">{row.arrivalLocation}</TableCell>
                    <TableCell align="left">{row.numberOfSeats}</TableCell>
                    <TableCell align="left">{row.typeOfSeats}</TableCell>
                    <TableCell align="left">{row.travelDate}</TableCell>
                    <TableCell align="left">{row.travelCost}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={(event) => {
                          cancelBooking(event, row.id, index);
                        }}
                      >
                        cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BookedTickets;
