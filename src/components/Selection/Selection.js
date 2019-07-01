import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

// context
import CartProvider from "components/providers/CartProvider";
import { StationsContext } from "components/providers/StationsProvider";

// components
import Cart from "components/Cart/Cart";
import Timetable from "components/Timetable/Timetable";
import SelectionHeader from "./Header/SelectionHeader";

// global styles
import RelativeWrapper from "components/styles/RelativeWrapper";

// local styles
import GridContainer from "./styles/GridContainer";
import Title from "./styles/Title";

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
