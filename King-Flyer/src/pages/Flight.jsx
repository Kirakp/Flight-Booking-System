import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
function Flight({ isLoggedIn, credentials }) {
  let navigate = useNavigate();
  const location = [
    "Ahmedabad",
    "Amritsar",
    "Bangalore",
    "Bhopal",
    "Chandigarh",
    "Dehradun",
    "Delhi",
    "Donakonda",
    "Guwahati",
    "Hisar",
    "Hyderabad",
    "Imphal",
    "Jaipur",
    "Jamshedpur",
    "Kolkata",
    "Manglore",
    "Mattannur",
    "Meenambakkam",
    "Mumbai",
    "Patna",
    "Pondicherry",
    "Raipur",
    "Shillong",
    "Shimla",
    "Srinagar",
    "Thoothukudi",
    "Varanasi",
    "Visakhapatnam",
  ];
  const [departureLocation, setDepartureLocation] = useState("Ahmedabad");
  const [arrivalLocation, setArrivalLocation] = useState("Amritsar");
  const [code, setCode] = useState("");
  const [model, setmodel] = useState("");
  const [totalEconomySeats, setTotalEconomySeats] = useState(0);
  const [totalPremiumSeats, setTotalPremiumSeats] = useState(0);
  const [totalBusinessSeats, setTotalBusinessSeats] = useState(0);
  const [remainingEconomySeats, setRemainingEconomySeats] = useState(0);
  const [remainingPremiumSeats, setRemainingPremiumSeats] = useState(0);
  const [remainingBusinessSeats, setRemainingBusinessSeats] = useState(0);
  const [departureTime, setDepartureTime] = useState(
    new Date().getFullYear() +
      "-" +
      "0" +
      new Date().getMonth() +
      "-" +
      new Date().getDate()
  );
  const [arrivalTime, setArrivalTime] = useState(
    new Date().getFullYear() +
      "-" +
      "0" +
      new Date().getMonth() +
      "-" +
      new Date().getDate()
  );
  const [economyFare, setEconomyFare] = useState("");
  const [premiumFare, setPremiumFare] = useState("");
  const [businessFare, setBusinessFare] = useState("");

  const add = (e) => {
    e.preventDefault();
    const user = {
      departureLocation,
      arrivalLocation,
      departureTime,
      arrivalTime,
      fleet: {
        code,
        model,
        totalEconomySeats,
        totalPremiumSeats,
        totalBusinessSeats,
      },
      status: {
        remainingEconomySeats,
        remainingPremiumSeats,
        remainingBusinessSeats,
      },
      fare: {
        economyFare,
        premiumFare,
        businessFare,
      },
    };
    if (
      code === "" ||
      model === "" ||
      totalEconomySeats === "" ||
      totalPremiumSeats === "" ||
      totalBusinessSeats === "" ||
      departureLocation === "" ||
      arrivalLocation === "" ||
      remainingEconomySeats === "" ||
      remainingBusinessSeats === "" ||
      remainingPremiumSeats === "" ||
      arrivalTime === "" ||
      departureTime === "" ||
      economyFare === "" ||
      premiumFare === "" ||
      businessFare === ""
    ) {
      alert("No null values");
    } else {
      console.log(user);
      fetch(`http://localhost:8080/api/flight/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
          Authorization: `Bearer ${credentials.access_token}`,
        },
        mode: "cors",
        body: JSON.stringify(user),
      }).then((res) => {
        navigate("/");
        alert("added new Flight");
      });
    }
  };
  return (
    <div className="Main">
      {isLoggedIn ? (
        <div className="">
          <h1 className="title">Flight</h1>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Autocomplete
                fullWidth
                disablePortal
                className="departure"
                id="combo-box-demo"
                options={location}
                value={departureLocation}
                onChange={(event, newValue) => {
                  arrivalLocation === newValue
                    ? alert("departure and arrival cannot be same")
                    : setDepartureLocation(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Departure Location" />
                )}
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                label="Departure Date"
                variant="outlined"
                fullWidth
                value={departureTime}
                margin="dense"
                type="date"
                onChange={(event) => {
                  setDepartureTime(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={3}>
              <Autocomplete
                fullWidth
                disablePortal
                className="departure"
                id="combo-box-demo"
                options={location}
                value={arrivalLocation}
                onChange={(event, newValue) => {
                  departureLocation === newValue
                    ? alert("departure and arrival cannot be same")
                    : setArrivalLocation(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Arrival Location" />
                )}
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                label="Arrival Date"
                variant="outlined"
                fullWidth
                value={arrivalTime}
                margin="dense"
                type="date"
                onChange={(event) => {
                  setArrivalTime(event.target.value);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Flight Code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Flight Model"
                variant="outlined"
                value={model}
                onChange={(e) => setmodel(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                label="Total Economy Seats"
                variant="outlined"
                type="number"
                value={totalEconomySeats}
                onChange={(e) => setTotalEconomySeats(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                label="Total Premium Seats"
                variant="outlined"
                type="number"
                value={totalPremiumSeats}
                onChange={(e) => setTotalPremiumSeats(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                label="Total Business Seats"
                variant="outlined"
                type="number"
                value={totalBusinessSeats}
                onChange={(e) => setTotalBusinessSeats(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                label="Economy Fare"
                variant="outlined"
                type="number"
                value={economyFare}
                onChange={(e) => setEconomyFare(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                label="Premium Fare"
                variant="outlined"
                type="number"
                value={premiumFare}
                onChange={(e) => setPremiumFare(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                label="Business Fare"
                variant="outlined"
                type="number"
                value={businessFare}
                onChange={(e) => setBusinessFare(e.target.value)}
              />
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="success"
                onClick={add}
              >
                Add Flight
              </Button>
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Flight;
