import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

function MenuItem({ val, key }) {
  return (
    <li
      className="item"
      key={key}
    >
      <NavLink to={val.link} className="link">
        <div className="SideBarItem">
          <div id="icon">{val.icon}</div>
          <div id="title">{val.title}</div>
        </div>
      </NavLink>
    </li>
  );
}

export default MenuItem;
