import React, { useContext } from "react";

// context
import { StationsContext } from "components/providers/StationsProvider";
import { CartContext } from "components/providers/CartProvider";

// local elements
import Logo from "./elements/Logo";
import Switch from "./elements/Switch";

// local styles
import Header from "./styles/Header";
import Route from "./styles/Route";

const SelectionHeader = () => {
  const {
    stationsDispatch,
    stations: { origin, destination }
  } = useContext(StationsContext);

  const { cartDispatch } = useContext(CartContext);

  const handleReturn = () => {
    stationsDispatch({ type: "clearDates" });
  };

  const handleSwitch = () => {
    stationsDispatch({ type: "switchStations" });
    cartDispatch({ type: "purge" });
  };

  return (
    <Header>
      <Logo to="/" handler={handleReturn} alt={"Mito Airline"} />
      <Route>
        <span>Leaving from</span>
        {origin.shortName}
      </Route>
      <Switch handler={handleSwitch} />
      <Route>{destination.shortName}</Route>
    </Header>
  );
};

export default SelectionHeader;
