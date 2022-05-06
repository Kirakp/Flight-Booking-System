import { ConnectingAirportsRounded } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import SearchResult from "./SearchResult";

function Search({ isLoggedIn }) {
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

  const [departure, setDeparture] = useState("Bangalore");
  const [arrival, setArrival] = useState("Mumbai");
  const [result, setResult] = useState([]);

  async function search(event) {
    event.preventDefault();
    if (departure !== null && arrival !== null) {
      const url =
        "http://localhost:8080/api/flight/search_flights/?departure=" +
        departure +
        "&arrival=" +
        arrival;
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
          console.log(res.data);
          setResult(res.data);
        });
    } else {
      alert("please fill the deatils");
    }
  }

  return (
    <div className="Main">
      <h1 className="title">Search Flights</h1>
      <div className="Container">
        <div className="textfield">
          <Autocomplete
            disablePortal
            className="departure"
            id="combo-box-demo"
            options={location}
            sx={{ width: 300 }}
            value={departure}
            onChange={(event, newValue) => {
              arrival === newValue
                ? alert("departure and arrival cannot be same")
                : setDeparture(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Departure Location" />
            )}
          />
          <ConnectingAirportsRounded className="icon" />
          <Autocomplete
            className="arrival"
            disablePortal
            id="combo-box-demo"
            options={location}
            sx={{ width: 300 }}
            value={arrival}
            onChange={(event, newValue) => {
              departure === newValue
                ? alert("departure and arrival cannot be same")
                : setArrival(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Arrival Location" />
            )}
          />
          {/* <FormControlLabel
            className="checkbox"
            control={
              <Checkbox
                checked={advanced}
                onChange={(event) => {
                  setAdvanced(event.target.checked);
                }}
              />
            }
            label="Advanced Search"
          /> */}
          <Button variant="contained" size="medium" onClick={search}>
            Search
          </Button>
        </div>
      </div>
      <SearchResult result={result} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Search;
