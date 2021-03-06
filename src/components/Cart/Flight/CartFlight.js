import React from "react";
import PropTypes from "prop-types";

// utils
import { convertDate } from "utils/convertDate";

// local styles
import Wrapper from "./_styles/Wrapper";
import Calendar from "./_styles/Calendar";
import Airport from "./_styles/Airport";

const Flight = props => {
  const { from, to, flight, isSeparated } = props;
  let { departure, arrival } = flight;
  departure = convertDate(departure);
  arrival = convertDate(arrival);

  return (
    <Wrapper data-testid="cart-flight" isSeparated={isSeparated}>
      <Calendar>
        <span>{departure.shortMonth}</span>
        <span>{departure.day}</span>
      </Calendar>
      <Airport>
        <span>{from.shortName}</span>
        <span>{to.shortName}</span>
        <span>
          {departure.weekday} {departure.time} – {arrival.time}
        </span>
      </Airport>
    </Wrapper>
  );
};

Flight.propTypes = {
  flight: PropTypes.object.isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired
};

export default Flight;
