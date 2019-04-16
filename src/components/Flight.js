import React from "react";
import PropTypes from "prop-types";

import "./styles/Flight.scss";

const Flight = props => {
  const { date, className } = props;
  const wrapperClass = `${className} flight`.trim();
  return (
    <div className={wrapperClass}>
      <p className="flight__calendar">
        <span className="calendar__month">{date.month}</span>
        <span>{date.day}</span>
      </p>
      <p className="flight__airport">
        <span className="flight__airport--origin">Budapest</span>
        <span>Barcelona El Prat</span>
        <span className="flight__airport--time">Wed 06:02 – 07:35</span>
      </p>
    </div>
  );
};

Flight.propTypes = {
  className: PropTypes.string,
  date: PropTypes.object.isRequired
};

Flight.defaultProps = {
  className: ""
};

export default Flight;
