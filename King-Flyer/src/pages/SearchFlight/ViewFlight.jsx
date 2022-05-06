import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Search.css";

const ViewFlight = ({ isLoggedIn }) => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const url = "http://localhost:8080/api/flight/get_flight/?id=" + id;
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
        setData(res.data);
      });
  }

  function book(event) {
    event.preventDefault();
    isLoggedIn ? navigate(`/view_flight/${id}`) : navigate("/login");
  }

  return (
    <div className="Main">
      <h1 className="title">ViewFlight</h1>
      {data !== null ? (
        <div className="details">
          <h3>Departure Location : {data.departureLocation}</h3>
          <h3>Departure Location : {data.departureTime}</h3>
          <h3>Arrival Location : {data.arrivalLocation}</h3>
          <h3>Departure Location : {data.arrivalTime}</h3>
          <h3>Flight Model : {data.fleet.model}</h3>
          <h3>
            Remaining Business Seats : {data.status.remainingBusinessSeats} -
            Cost : Rs{data.fare.businessFare}/- (per ticket)
          </h3>
          <h3>
            Remaining Economy Seats : {data.status.remainingEconomySeats} - Cost
            : Rs{data.fare.economyFare}/- (per ticket)
          </h3>
          <h3>
            Remaining Business Seats : {data.status.remainingPremiumSeats} -
            Cost : Rs{data.fare.premiumFare}/- (per ticket)
          </h3>

          <Button
            id="book"
            variant="contained"
            size="medium"
            color="success"
            onClick={book}
          >
            Book tickets
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewFlight;
