import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ListFlightsComponent({ data, isLoggedIn }) {
  let navigate = useNavigate();
  return (
    <div>
      <div>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr key={data.id}>
              <td style={{ width: "15%" }}> {data.arrivalLocation}</td>
              <td style={{ width: "15%" }}> {data.departureLocation}</td>
              <td style={{ width: "15%" }}> {data.remainingEconomySeats}</td>
              <td style={{ width: "15%" }}> {data.remainingPremiumSeats}</td>
              <td style={{ width: "15%" }}> {data.remainingBusinessSeats} </td>

              <td style={{ width: "15%" }}>
                <Link to={`/flight-booking/${data.id}`}>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      console.log(isLoggedIn);
                      isLoggedIn
                        ? navigate("/booked_tickets")
                        : navigate("/login");
                    }}
                    className="btn btn-info"
                  >
                    {" "}
                    Book{" "}
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListFlightsComponent;
