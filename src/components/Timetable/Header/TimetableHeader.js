import React, { useContext } from "react";
import PropTypes from "prop-types";

// context
import { StationsContext } from "components/providers/StationsProvider";

// local styles
import Header from "./_styles/Header";

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
      <h2 data-testid="tt-header">{status}</h2>
      <p data-testid="tt-info">
        <span>{from}</span>
        <img src={mediumArrow} alt="to" />
        <span>{to}</span>
      </p>
    </Header>
  );
};

Timetable.propTypes = {
  type: PropTypes.string.isRequired
};

export default Timetable;
