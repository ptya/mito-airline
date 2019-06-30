import React, { useContext } from "react";
import PropTypes from "prop-types";

// context
import { StationsContext } from "components/StationsProvider";

// local elements
import Header from "./elements/Header";

// assets
import mediumArrow from "assets/images/arrow-medium.svg";

const Timetable = props => {
  const {
    stations: { origin, destination }
  } = useContext(StationsContext);

  const { type } = props;

  const status = type === "outbound" ? "Outbound" : "Inbound";
  const from = type === "outbound" ? origin.shortName : destination.shortName;
  const to = type === "outbound" ? destination.shortName : origin.shortName;

  return (
    <Header>
      <h2>{status}</h2>
      <p>
        {from}
        <img src={mediumArrow} alt="to" />
        {to}
      </p>
    </Header>
  );
};

Timetable.propTypes = {
  type: PropTypes.string.isRequired
};

export default Timetable;
