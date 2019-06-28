import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";

// context
import CartProvider from "../CartProvider";
import { StationsContext } from "../StationsProvider";

// components
import Cart from "components/Cart/Cart";
import Timetable from "components/Timetable/Timetable";
import SelectionHeader from "./Header/SelectionHeader";

// global elements
import RelativeWrapper from "components/elements/RelativeWrapper";

// local elements./Header/Header
import GridContainer from "./elements/GridContainer";
import GridItem from "./elements/GridItem";
// import Cart from "./elements/Cart";
import Inbound from "./elements/Inbound";
import Outbound from "./elements/Outbound";
import Title from "./elements/Title";

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
      <SelectionHeader />
      <CartProvider>
        <GridContainer>
          <Title>
            <img src={plane} alt="Airplane" />
            Select Flight
          </Title>
          <Cart area="cart" className="main__cart" />
          {departureDate && <Timetable type="outbound" />}
          {!departureDate && <Redirect to="/" />}
          <Timetable type="inbound" />
        </GridContainer>
      </CartProvider>
    </RelativeWrapper>
  );
};

export default Selection;
