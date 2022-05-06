import React, { useState } from "react";
import "../App.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
function AddAdmin({ isLoggedIn, credentials }) {
  const [firstname, setFirstname] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [type, setType] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  let navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    const user = {
      username,
      firstname,
      lastname,
      password,
      contact: {
        email,
        mobileNo,
        address: {
          type,
          addressLine,
          zipCode,
          city,
          state,
          country,
        },
      },
    };

    if (
      username === "" ||
      firstname === "" ||
      lastname === "" ||
      password === "" ||
      email === "" ||
      mobileNo === "" ||
      type === "" ||
      addressLine === "" ||
      zipCode === "" ||
      city === "" ||
      state === "" ||
      country === ""
    ) {
      alert("No null values");
    } else {
      console.log(user);
      fetch("http://localhost:8080/api/admin/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          Authorization: `Bearer ${credentials.access_token}`,
        },
        mode: "cors",
        body: JSON.stringify(user),
      }).then((res) => {
        navigate("/");
        alert("added new admin");
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Main">
      <h1 className="title">Add Admin</h1>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Email"
            type={"email"}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Mobile number"
            variant="outlined"
            type={"tel"}
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Address type"
            variant="outlined"
            placeholder="Home / Office"
            onChange={(e) => setType(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Address Line"
            variant="outlined"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="State"
            variant="outlined"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            label="Zip-Code"
            variant="outlined"
            value={zipCode}
            type="number"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="success"
            onClick={register}
          >
            add new admin
          </Button>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </div>
  );
}

export default AddAdmin;
