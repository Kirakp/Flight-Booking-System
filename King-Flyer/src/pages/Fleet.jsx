import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
function Fleet({ isLoggedIn, credentials }) {
  const [code, setCode] = useState("");
  const [model, setmodel] = useState("");
  const [totalEconomySeats, setTotalEconomySeats] = useState("");
  const [totalPremiumSeats, setTotalPremiumSeats] = useState("");
  const [totalBusinessSeats, setTotalBusinessSeats] = useState("");
  let navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    const user = {
      code,
      model,
      totalEconomySeats,
      totalPremiumSeats,
      totalBusinessSeats,
    };
    if (
      code === "" ||
      model === "" ||
      totalEconomySeats === "" ||
      totalPremiumSeats === "" ||
      totalBusinessSeats === ""
    ) {
      alert("No null values");
    } else {
      console.log(user);
      fetch(`http://localhost:8080/api/fleet/add/`, {
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
        alert("added new fleet");
      });
    }
  };
  return (
    <div className="Main">
      {isLoggedIn ? (
        <div>
          <h1 className="title">Fleet</h1>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Model"
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
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="success"
                onClick={add}
              >
                Add Fleet
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

export default Fleet;
