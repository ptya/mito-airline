import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";

import CartProvider from "./CartProvider";
import Cart from "./Cart";
import Timetable from "./Timetable";
import TimetableSelect from "./TimetableSelect";

import { StationsContext } from "./StationsProvider";

import logo from "../assets/images/mito-logo.svg";
import arrows from "../assets/images/arrows.svg";
import plane from "../assets/images/plane.svg";

const Selection = () => {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate
  } = useContext(StationsContext);

  const handleReturn = () => {
    setDepartureDate();
    setReturnDate();
  };

  return (
    <>
      {(!origin || !destination || !departureDate) && <Redirect to="/" />}
      <header className="header">
        <Link to="/" className="header__logo" onClick={() => handleReturn()}>
          <img className="header__logo" src={logo} alt="Mito Airline" />
        </Link>
        <p className="header__route">
          <span className="header__info">Leaving from</span>
          {origin.shortName}
        </p>
        <img className="header__arrows" src={arrows} alt="From - to" />
        <p className="header__route">{destination.shortName}</p>
      </header>
      <CartProvider>
        <div className="main">
          <h1 className="main__title">
            <img className="main__airplane" src={plane} alt="Airplane" />
            Select Flight
          </h1>
          <Cart className="main__cart" />
          {departureDate && (
            <Timetable
              className="main__timetable main__timetable--out"
              type="outbound"
            />
          )}
          {returnDate && (
            <Timetable
              className="main__timetable main__timetable--in"
              type="inbound"
            />
          )}
          {!returnDate && (
            <TimetableSelect className="main__timetable main__timetable--in" />
          )}
        </div>
      </CartProvider>
    </>
  );
};

export default Selection;
