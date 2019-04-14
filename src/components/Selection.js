import React from "react";

import logo from "../assets/images/mito-logo.svg";
import arrows from "../assets/images/arrows.svg";
import "./styles/Selection.scss";

const Selection = () => {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="Mito Airline" />
        <p className="header__route">
          <span className="header__info">Leaving from</span>
          Origin
        </p>
        <img className="header__arrows" src={arrows} alt="From - to" />
        <p className="header__route">Destination</p>
      </header>
      <div>
        <p>Hello</p>
      </div>
    </>
  );
};

export default Selection;
