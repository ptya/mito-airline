import React, { useContext } from "react";
import { Link } from "react-router-dom";

// context
import { StationsContext } from "components/StationsProvider";

// local elements
import Header from "./elements/Header";
import Logo from "./elements/Logo";

import arrows from "assets/images/arrows.svg";
import logo from "assets/images/mito-logo.svg";

const SelectionHeader = () => {
  const { origin, destination, setDepartureDate, setReturnDate } = useContext(
    StationsContext
  );

  const handleReturn = () => {
    setDepartureDate();
    setReturnDate();
  };
  return (
    <Header>
      <Logo to="/" handler={handleReturn} />
      <p className="header__route">
        <span className="header__info">Leaving from</span>
        {origin.shortName}
      </p>
      <img className="header__arrows" src={arrows} alt="From - to" />
      <p className="header__route">{destination.shortName}</p>
    </Header>
  );
};

export default SelectionHeader;
