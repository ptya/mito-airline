import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// context
import { CartContext } from "../CartProvider";
import { StationsContext } from "../StationsProvider";

// utils
import { convertDate } from "../../utils/convertDate";
import { formatMoney } from "../../utils/formatMoney";

// global elements
import { Spinner } from "../elements/Spinner";

// local elements
import TableWrapper from "./elements/TableWrapper";
import TableHeader from "./elements/TableHeader";
import TableRow from "./elements/TableRow";
import TableButton from "./elements/TableButton";

// assets
import smallArrow from "../../assets/images/arrow-small.svg";
import mediumArrow from "../../assets/images/arrow-medium.svg";
import chevron from "../../assets/images/chevron.svg";

const Timetable = props => {
  const { cartDispatch, cart } = useContext(CartContext);
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate
  } = useContext(StationsContext);

  const { className, type } = props;
  const actionType = type === "outbound" ? "setOutbound" : "setInbound";

  const [day, setDay] = useState(
    type === "outbound" ? departureDate : returnDate
  );
  const [prevDay, setPrevDay] = useState(
    convertDate(new Date(new Date(day.date).setDate(day.day - 1)))
  );
  const [nextDay, setNextDay] = useState(
    convertDate(new Date(new Date(day.date).setDate(day.day + 1)))
  );
  const [flights, setFlights] = useState();

  useEffect(() => {
    async function fetchFlights() {
      const dep = type === "outbound" ? origin.iata : destination.iata;
      const arr = type === "outbound" ? destination.iata : origin.iata;
      const res = await fetch(
        `https://mock-air.herokuapp.com/search?departureStation=${dep}&arrivalStation=${arr}&date=${day.isoDate}`
      );
      const data = await res.json();
      setFlights(data);
    }
    fetchFlights();
  }, [day, destination.iata, origin.iata, type]); // only fetch again if day changes

  const handleDayChange = date => {
    setFlights();
    setDay(date);
    setPrevDay(
      convertDate(new Date(new Date(date.date).setDate(date.day - 1)))
    );
    setNextDay(
      convertDate(new Date(new Date(date.date).setDate(date.day + 1)))
    );
    type === "outbound" ? setDepartureDate(date) : setReturnDate(date);
  };

  const blockClass = `${className} timetable`.trim();
  const today = new Date();

  const isToday =
    day.day === today.getDate() &&
    day.month === today.getMonth() &&
    day.year === today.getFullYear();

  const isPrevAvailable =
    !isToday &&
    (departureDate.date.getDate() !== prevDay.day || !departureDate);

  const isNextAvailable =
    (returnDate && returnDate.date.getDate() !== nextDay.day) || !returnDate;

  const selectedFare =
    type === "outbound" ? cart.outboundFare : cart.inboundFare;

  const status = type === "outbound" ? "Outbund" : "Inbound";
  const from = type === "outbound" ? origin.shortName : destination.shortName;
  const to = type === "outbound" ? destination.shortName : origin.shortName;

  return (
    <div className={blockClass}>
      <div className="timetable__header">
        <h2>
          {status}
          <span className="timetable__route">
            {from}
            <img src={mediumArrow} alt="to" />
            {to}
          </span>
        </h2>
      </div>
      <div className="timetable__date">
        <div className="timetable__step">
          {isPrevAvailable && (
            <button type="button" onClick={() => handleDayChange(prevDay)}>
              <img src={chevron} alt="Previous day" />
              <span>{`${prevDay.shortMonth} ${prevDay.day} ${prevDay.fullMonth}`}</span>
            </button>
          )}
        </div>
        <h3>{`${day.fullWeekday}, ${day.day} ${day.fullMonth} ${day.year}`}</h3>
        <div className="timetable__step timetable__step--next">
          {isNextAvailable && (
            <button type="button" onClick={() => handleDayChange(nextDay)}>
              <img src={chevron} alt="Next day" />
              <span>{`${nextDay.shortMonth} ${nextDay.day} ${nextDay.fullMonth}`}</span>
            </button>
          )}
        </div>
      </div>
      {/* <div className="timetable__times"> */}
      <TableWrapper>
        <>
          {!flights && (
            <p className="timetable__loading">
              <Spinner width={50} />
            </p>
          )}
          {flights && flights.length === 0 && (
            <p className="timetable__no-flights">
              There are no available flights this day.
            </p>
          )}
          {flights && flights.length > 0 && (
            // <TableWrapper>
            <>
              <TableHeader>
                <span className="basic">Basic</span>
                <span className="standard">Standard</span>
                <span className="plus">Plus</span>
              </TableHeader>
              {flights.map(flight => {
                if (flight.remainingTicket === 0) return null;
                const depTime = convertDate(flight.departure);
                const isDisabled =
                  isToday && Date.now() > depTime.date.getTime();
                const arrTime = convertDate(flight.arrival);
                return (
                  <TableRow isDisabled={isDisabled} key={flight.flightNumber}>
                    <div className="time">
                      <span>{depTime.time}</span>
                      <img src={smallArrow} alt="to" />
                      <span>{arrTime.time}</span>
                    </div>
                    <div className="basic">
                      <TableButton
                        isActive={selectedFare === flight.fares[0].fareSellKey}
                        type="button"
                        disabled={isDisabled}
                        onClick={() =>
                          cartDispatch({
                            type: actionType,
                            price: flight.fares[0].price * 100,
                            flight,
                            fare: flight.fares[0].fareSellKey
                          })
                        }
                      >
                        {formatMoney(flight.fares[0].price * 100)}
                      </TableButton>
                    </div>
                    <div className="standard">
                      <TableButton
                        isActive={selectedFare === flight.fares[1].fareSellKey}
                        type="button"
                        disabled={isDisabled}
                        onClick={() =>
                          cartDispatch({
                            type: actionType,
                            price: flight.fares[1].price * 100,
                            flight,
                            fare: flight.fares[1].fareSellKey
                          })
                        }
                      >
                        {formatMoney(flight.fares[1].price * 100)}
                      </TableButton>
                    </div>
                    <div className="plus">
                      <TableButton
                        isActive={selectedFare === flight.fares[2].fareSellKey}
                        type="button"
                        disabled={isDisabled}
                        onClick={() =>
                          cartDispatch({
                            type: actionType,
                            price: flight.fares[2].price * 100,
                            flight,
                            fare: flight.fares[2].fareSellKey
                          })
                        }
                      >
                        {formatMoney(flight.fares[2].price * 100)}
                      </TableButton>
                    </div>
                  </TableRow>
                );
              })}
            </>
            /* </TableWrapper> */
          )}
        </>
        {/* </div> */}
      </TableWrapper>
    </div>
  );
};

Timetable.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired
};

Timetable.defaultProps = {
  className: ""
};

export default Timetable;
