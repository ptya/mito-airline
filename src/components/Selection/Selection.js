import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";

// context
import CartProvider from "../CartProvider";
import { StationsContext } from "../StationsProvider";

// components
import Cart from "components/Cart/Cart";
import Timetable from "components/Timetable/Timetable";

// global elements
import RelativeWrapper from "components/elements/RelativeWrapper";

// local elements
import Inbound from "./elements/Inbound";
import Outbound from "./elements/Outbound";

// assets
import logo from "assets/images/mito-logo.svg";
import arrows from "assets/images/arrows.svg";
import plane from "assets/images/plane.svg";

const Selection = () => {
  const {
    origin,
    destination,
    departureDate,
    setDepartureDate,
    setReturnDate
  } = useContext(StationsContext);

  const handleReturn = () => {
    setDepartureDate();
    setReturnDate();
  };

  if (!origin || !destination) return <Redirect to="/" />;

  return (
    <RelativeWrapper>
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
            <Outbound>
              <Timetable type="outbound" />
            </Outbound>
          )}
          {!departureDate && <Redirect to="/" />}
          <Inbound>
            <Timetable type="inbound" />
          </Inbound>
        </div>
      </CartProvider>
    </RelativeWrapper>
  );
};

export default Selection;
