import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { StationsContext } from "./StationsProvider";

import logo from "../assets/images/mito-logo.svg";
import arrows from "../assets/images/arrows.svg";

const Header = ({ home, history }) => {
  const { origin, destination, setDepartureDate, setReturnDate } = useContext(
    StationsContext
  );
  const handleReturn = () => {
    setDepartureDate();
    setReturnDate();
    history.push("/");
  };

  return (
    <>
      {home && (
        <header className="search__header">
          <img className="search__logo" src={logo} alt="Mito Airline" />
          <h1 className="search__title">Mito Airline</h1>
        </header>
      )}
      {!home && (
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
      )}
    </>
  );
};

export default withRouter(Header);
