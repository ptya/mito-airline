import React, { useContext } from "react";

// context
import { StationsContext } from "components/providers/StationsProvider";
import { CartContext } from "components/providers/CartProvider";

// local elements
import Logo from "./_elements/Logo";
import Switch from "./_elements/Switch";

// local styles
import Header from "./_styles/Header";
import Route from "./_styles/Route";

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
      <Route data-testid="sh-origin">
        <span>Leaving from</span>
        {origin.shortName}
      </Route>
      <Switch handler={handleSwitch} />
      <Route data-testid="sh-dest">{destination.shortName}</Route>
    </Header>
  );
};

export default SelectionHeader;
