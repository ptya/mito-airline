import React, { useContext } from "react";

// context
import { StationsContext } from "components/StationsProvider";

// local elements
import Header from "./elements/Header";
import Logo from "./elements/Logo";
import Route from "./elements/Route";
import Switch from "./elements/Switch";

const SelectionHeader = () => {
  const {
    stationsDispatch,
    stations: { origin, destination }
  } = useContext(StationsContext);

  const handleReturn = () => {
    stationsDispatch({ type: "clearDates" });
  };

  return (
    <Header>
      <Logo to="/" handler={handleReturn} alt={"Mito Airline"} />
      <Route>
        <span>Leaving from</span>
        {origin.shortName}
      </Route>
      <Switch />
      <Route>{destination.shortName}</Route>
    </Header>
  );
};

export default SelectionHeader;
