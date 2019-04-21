import React, { useContext, useRef } from "react";
import { withRouter } from "react-router-dom";
import CartProvider from "./CartProvider";
import Cart from "./Cart";
import Timetable from "./Timetable";
import { StationsContext } from "./StationsProvider";

import logo from "../assets/images/mito-logo.svg";
import arrows from "../assets/images/arrows.svg";
import plane from "../assets/images/plane.svg";

import "./styles/Selection.scss";

const Selection = props => {
  const { history } = props;
  const {
    origin,
    destination,
    departureDate,
    setDepartureDate,
    setReturnDate
  } = useContext(StationsContext);
  if (!origin || !destination || !departureDate) {
    history.push("/");
    return null;
  }

  const handleReturn = () => {
    setDepartureDate();
    setReturnDate();
    history.push("/");
  };

  return (
    <>
      <header className="header">
        <button
          className="header__logo"
          type="button"
          onClick={() => handleReturn()}
        >
          <img className="header__logo" src={logo} alt="Mito Airline" />
        </button>
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
          <Timetable
            className="main__timetable main__timetable--out"
            type="outbound"
          />
          <Timetable
            className="main__timetable main__timetable--in"
            type="inbound"
          />
        </div>
      </CartProvider>
    </>
  );
};

export default withRouter(Selection);
