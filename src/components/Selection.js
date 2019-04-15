import React from "react";
import Cart from "./Cart";
import Timetable from "./Timetable";

import logo from "../assets/images/mito-logo.svg";
import arrows from "../assets/images/arrows.svg";
import plane from "../assets/images/plane.svg";

import "./styles/Selection.scss";

const Selection = () => {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Mito Airline" />
        <p className="header__route">
          <span className="header__info">Leaving from</span>
          Origin
        </p>
        <img className="header__arrows" src={arrows} alt="From - to" />
        <p className="header__route">Destination</p>
      </header>
      <div className="main">
        <h1 className="main__title">
          <img className="main__airplane" src={plane} alt="Airplane" />
          Select Flight
        </h1>
        <Cart className="main__cart" />
        <Timetable className="main__timetable main__timetable--out" />
        <Timetable className="main__timetable main__timetable--in" />
      </div>
    </>
  );
};

export default Selection;
