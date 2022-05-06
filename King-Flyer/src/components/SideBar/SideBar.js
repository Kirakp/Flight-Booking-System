import React from "react";
import "../../App.css";
import "./SideBar.css";
import logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { LoginRounded, LogoutRounded } from "@mui/icons-material";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { General } from "./SideBarData/General";
import { User } from "./SideBarData/User";
import { Admin } from "./SideBarData/Admin";
import MenuItem from "./MenuItem";

function SideBar({ credentials, setCredentials, isLoggedIn, setIsLoggedIn }) {
  function setLogin(event) {
    event.preventDefault();
    if (isLoggedIn === false) {
      navigate("/login");
    } else {
      setIsLoggedIn(!isLoggedIn);
      setCredentials({
        access_token: "",
        role: "",
      });
      navigate("/");
    }
  }
  let navigate = useNavigate();

  return (
    <div className="SideBar">
      <div className="SideBarContainer">
        <div className="logoContainer">
          <Link to={"/"}>
            <img
              className="logo"
              src={logo}
              alt=""
              width={"150px"}
              height={"35.82px"}
            />
          </Link>
        </div>
        <hr />

        <ul className="SideBarList">
          {General.map((val, key) => {
            return <MenuItem val={val} key={key} />;
          })}
          {isLoggedIn
            ? credentials.role === "[ADMIN]"
              ? Admin.map((val, key) => {
                  return <MenuItem val={val} key={key} />;
                })
              : credentials.role === "[USER]"
              ? User.map((val, key) => {
                  return <MenuItem val={val} key={key} />;
                })
              : ""
            : ""}
        </ul>

        {/* <NavLink to={"/hello"}>Hello</NavLink> */}

        <div className="button">
          {isLoggedIn ? (
            <Button
              variant="contained"
              color="warning"
              sx={{ width: "180px" }}
              onClick={setLogin}
              startIcon={<LogoutRounded />}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{ width: "180px" }}
              onClick={setLogin}
              startIcon={<LoginRounded />}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
