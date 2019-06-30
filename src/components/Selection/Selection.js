import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

// context
import CartProvider from "components/providers/CartProvider";
import { StationsContext } from "components/providers/StationsProvider";

// components
import Cart from "components/Cart/Cart";
import Timetable from "components/Timetable/Timetable";
import SelectionHeader from "./Header/SelectionHeader";

// global elements
import RelativeWrapper from "components/elements/RelativeWrapper";

// local elements
import GridContainer from "./elements/GridContainer";
import Title from "./elements/Title";

// assets
import plane from "assets/images/plane.svg";

const Selection = () => {
  const {
    stations: { origin, destination, departureDate }
  } = useContext(StationsContext);

  if (!origin || !destination) return <Redirect to="/" />;

  return (
    <RelativeWrapper>
      <CartProvider>
        <SelectionHeader />
        <GridContainer>
          <Title>
            <img src={plane} alt="Airplane" />
            Select Flight
          </Title>
          <Cart area="cart" />
          {departureDate && <Timetable type="outbound" />}
          {!departureDate && <Redirect to="/" />}
          <Timetable type="inbound" />
        </GridContainer>
      </CartProvider>
    </RelativeWrapper>
  );
};

export default Selection;
