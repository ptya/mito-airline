import React from "react";
import PropTypes from "prop-types";

import { convertDate } from "../utils/convertDate";

import "./styles/Flight.scss";

const Flight = props => {
  const { from, to, flight, className } = props;
  let { departure, arrival } = flight;
  departure = convertDate(departure);
  arrival = convertDate(arrival);

  const wrapperClass = `${className} flight`.trim();
  return (
    <div className={wrapperClass}>
      <p className="flight__calendar">
        <span className="calendar__month">{departure.shortMonth}</span>
        <span>{departure.day}</span>
      </p>
      <p className="flight__airport">
        <span className="flight__airport--origin">{from.shortName}</span>
        <span>{to.shortName}</span>
        <span className="flight__airport--time">
          {departure.weekday} {departure.time} – {arrival.time}
        </span>
      </p>
    </div>
  );
};

Flight.propTypes = {
  className: PropTypes.string,
  flight: PropTypes.object.isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired
};

Flight.defaultProps = {
  className: ""
};

export default Flight;
