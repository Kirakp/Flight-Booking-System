import { Delete } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import "./Search.css";

const PassengersList = ({
  setPassengesList,
  passengersList,
  passengersDetails,
}) => {

  function addPassenger(event) {
    event.preventDefault();
    setPassengesList([...passengersList, passengersDetails]);
  }

  function onChange(event, index) {
    const update = passengersList.map((val, i) =>
      index === i
        ? Object.assign(val, { [event.target.name]: event.target.value })
        : val
    );
    setPassengesList(update);
  }

  function remove(index) {
    const filtered = [...passengersList];
    filtered.splice(index, 1);
    setPassengesList(filtered);
  }

  return (
    <Container>
      <h3>Passengers Details</h3>
      {passengersList.map((val, index) => (
        <Grid container className="grid" spacing={3} key={index}>
          <Grid item md={2}>
            <TextField
              fullWidth
              name="firstname"
              variant="outlined"
              label={"Firstname"}
              value={val.firstname}
              onChange={(e) => onChange(e, index)}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              name="lastname"
              fullWidth
              variant="outlined"
              value={val.lastname}
              label={"Lastname"}
              onChange={(e) => onChange(e, index)}
            />
          </Grid>
          <Grid item md={1}>
            <TextField
              name="age"
              fullWidth
              variant="outlined"
              label={"Age"}
              type="number"
              value={val.age}
              onChange={(e) => onChange(e, index)}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              name="gender"
              variant="outlined"
              label={"Gender"}
              value={val.gender}
              placeholder={"M or F or O"}
              onChange={(e) => onChange(e, index)}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              name="passportNo"
              variant="outlined"
              value={val.passportNo}
              label={"Passport Number"}
              onChange={(e) => onChange(e, index)}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              name="mealPref"
              variant="outlined"
              label={"Meal Pref"}
              value={val.mealPref}
              onChange={(e) => onChange(e, index)}
            />
          </Grid>
          <Grid item md={1}>
            <IconButton color="error" onClick={() => remove(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button className="add" variant="contained" onClick={addPassenger}>
        Add Passenger
      </Button>
    </Container>
  );
};

export default PassengersList;
