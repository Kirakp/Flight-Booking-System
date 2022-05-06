import { Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
// import "../../App.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login({ credentials, setCredentials, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  function setUsernameHandler(event) {
    setUsername(event.target.value);
  }
  function setPasswordHandler(event) {
    setPassword(event.target.value);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function loginHandler(event) {
    event.preventDefault();
    if (username.length > 0 && password.length > 0) {
      const params = new URLSearchParams();
      params.append("username", { username });
      params.append("password", { password });
      const url =
        "http://localhost:8080/api/login/?username=" +
        username +
        "&password=" +
        password;
      console.log(url);
      await axios
        .post(url, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setCredentials({
            access_token: res.data.access_token,
            role: res.data.role,
            username: res.data.username,
          });
          setIsLoggedIn(true);
          navigate("/");
        });
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div className="Main">
      <h1 className="title">Login</h1>
      <div className="container">
        <TextField
          required
          label="Username"
          variant="filled"
          value={username}
          margin="dense"
          onChange={setUsernameHandler}
        />

        <FormControl required variant="filled" margin="dense">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            required
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPasswordHandler}
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
          />
        </FormControl>

        <Button
          className="btn"
          variant="contained"
          size="large"
          onClick={loginHandler}
        >
          Login
        </Button>

        <div className="divider">
          <hr />
          <h5>OR</h5>
          <hr />
        </div>

        <Button
          className="register"
          variant="outlined"
          size="large"
          onClick={(e) => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Login;
