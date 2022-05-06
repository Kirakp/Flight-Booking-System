import axios from "axios";
import "./Search.css";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import PassengersList from "./PassengersList";
import Payment from "./Payment";

const Booking = ({ credentials, isLoggedIn }) => {
  const username = credentials.username;
  let { id, departure, arrival } = useParams();
  let navigate = useNavigate();
  const [data, setData] = useState(null);

  const [cost, setCost] = useState(0);
  const [book, setBook] = useState(true);
  const [open, setOpen] = useState(false);

  const passengersDetails = {
    firstname: "",
    lastname: "",
    age: null,
    gender: "",
    passportNo: "",
    mealPref: "",
  };
  const [passengersList, setPassengesList] = useState([passengersDetails]);

  const [bookingData, setBookingData] = useState({
    bookingNumber: 1234,
    bookingDate:
      new Date().getFullYear() +
      "-" +
      "0" +
      new Date().getMonth() +
      "-" +"0"+
      new Date().getDate(),
    travelDate:
      new Date().getFullYear() +
      "-" +
      "0" +
      new Date().getMonth() +
      "-" +
      new Date().getDate(),
    departureLocation: departure,
    arrivalLocation: arrival,
    travelCost: cost,
    numberOfSeats: 1,
    typeOfSeats: "business",
    bookedFlightId: id,
    username: username,
    passengerList: passengersList,
    payment: {
      amount: cost,
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const url = "http://localhost:8080/api/flight/get_flight/?id=" + id;
    console.log(url);
    await axios
      .get(url, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
        setCost(res.data.fare.businessFare * bookingData.numberOfSeats);
        console.log(res.data.fare.businessFare * bookingData.numberOfSeats);
      });
  }

  async function bookTickteHandler(event) {
    event.preventDefault();
    const bodyJson = JSON.stringify(bookingData);
    console.log(bodyJson);
    const url = "http://localhost:8080/api/booking/add_booking";
    console.log(url);
    await axios
      .post(url, bodyJson, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.access_token}`,
        },
      })
      .then((res) => {
        navigate("/booked_tickets");
      });
  }

  const updateNumber = (event) => {
    setBookingData({
      ...bookingData,
      numberOfSeats: event.target.value,
    });

    if (bookingData.typeOfSeats === "business") {
      setCost(data.fare.businessFare * event.target.value);
    } else if (bookingData.typeOfSeats === "economy") {
      setCost(data.fare.economyFare * event.target.value);
    } else if (bookingData.typeOfSeats === "premium") {
      setCost(data.fare.premiumFare * event.target.value);
    }
  };
  const updateSeat = (event) => {
    setBookingData({
      ...bookingData,
      typeOfSeats: event.target.value,
    });

    if (event.target.value === "business") {
      setCost(data.fare.businessFare * bookingData.numberOfSeats);
    } else if (event.target.value === "economy") {
      setCost(data.fare.economyFare * bookingData.numberOfSeats);
    } else if (event.target.value === "premium") {
      setCost(data.fare.premiumFare * bookingData.numberOfSeats);
    }
  };

  return (
    <div className="Main">
      {isLoggedIn ? (
        <div>
          <h1 className="title">Book Tickets</h1>
          <h3 className="location">
            {departure} to {arrival}
          </h3>
          {data !== null ? (
            <div className="details">
              <div className="inputField">
                <TextField
                  required
                  className="textfield"
                  label="Travel Date"
                  variant="filled"
                  value={bookingData.travelDate}
                  margin="dense"
                  type="date"
                  onChange={(event) => {
                    setBookingData({
                      ...bookingData,
                      travelDate: event.target.value,
                    });
                  }}
                />
                <TextField
                  required
                  className="textfield"
                  label="Number of Seats"
                  variant="filled"
                  value={bookingData.numberOfSeats}
                  margin="dense"
                  type="number"
                  onChange={updateNumber}
                />
              </div>
              <div className="radioCont">
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Select Type of Seats
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={bookingData.typeOfSeats}
                  onChange={updateSeat}
                >
                  <div className="typeOfSeats">
                    <FormControlLabel
                      value="business"
                      control={<Radio />}
                      label="Business"
                    />
                    <FormControlLabel
                      value="economy"
                      control={<Radio />}
                      label="Economy"
                    />
                    <FormControlLabel
                      value="premium"
                      control={<Radio />}
                      label="Premium"
                    />
                  </div>
                </RadioGroup>
              </div>
              <PassengersList
                setPassengesList={setPassengesList}
                passengersDetails={passengersDetails}
                passengersList={passengersList}
              />

              <Grid container className="grid" spacing={5}>
                <Grid item md={3}>
                  <Typography
                    variant="h6"
                    ml={3}
                    mt={0}
                    gutterBottom
                    component="div"
                  >
                    Total Cost : Rs
                    {cost}
                    /-
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  <Button
                    fullWidth
                    disabled={!book}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={(e) => setOpen(true)}
                  >
                    Make Payment
                  </Button>
                </Grid>
                <Grid item md={3}>
                  <Button
                    fullWidth
                    disabled={book}
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={bookTickteHandler}
                  >
                    Book Ticket
                  </Button>
                </Grid>
              </Grid>
              <Payment
                open={open}
                setOpen={setOpen}
                cost={cost}
                setBook={setBook}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <h1 className="title">Please Login in</h1>
      )}
    </div>
  );
};

export default Booking;
