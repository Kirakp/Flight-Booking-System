import React from "react";
import {
  PersonAddAltRounded,
  LocationOnRounded,
  LocalAirportRounded,
  AirlineSeatReclineNormalRounded,
  CurrencyRupeeRounded,
  AirlinesRounded,
  Widgets,
  Person,
  AirplaneTicket,
} from "@mui/icons-material";
export const Admin = [
  {
    title: "Profile",
    icon: <Person />,
    link: "/profile",
  },
  {
    title: "Booked Tickets",
    icon: <AirplaneTicket />,
    link: "/booked_tickets",
  },
  {
    title: "Add Admin",
    icon: <PersonAddAltRounded />,
    link: "/add_admin",
  },
  {
    title: "Location",
    icon: <LocationOnRounded />,
    link: "/location",
  },
  {
    title: "Flight",
    icon: <LocalAirportRounded />,
    link: "/flight",
  },
  {
    title: "Flight Status",
    icon: <AirlineSeatReclineNormalRounded />,
    link: "/flight_status",
  },
  {
    title: "Fleet",
    icon: <AirlinesRounded />,
    link: "/fleet",
  },
  {
    title: "Fare",
    icon: <CurrencyRupeeRounded />,
    link: "/fare",
  },
];
