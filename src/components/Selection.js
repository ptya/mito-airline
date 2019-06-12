import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import Header from "./Header";
import CartProvider from "./CartProvider";
import Cart from "./Cart";
import Timetable from "./Timetable";
import TimetableSelect from "./TimetableSelect";

import { StationsContext } from "./StationsProvider";

import plane from "../assets/images/plane.svg";

const Selection = props => {
  const { history } = props;
  const { origin, destination, departureDate, returnDate } = useContext(
    StationsContext
  );

  if (!origin || !destination || !departureDate) {
    history.push("/");
    return null;
  }

  return (
    <>
      <Header />
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

export default withRouter(Selection);
