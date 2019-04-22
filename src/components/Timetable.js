import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./CartProvider";
import { StationsContext } from "./StationsProvider";
import { convertDate } from "../utils/convertDate";
import { formatMoney } from "../utils/formatMoney";

import smallArrow from "../assets/images/arrow-small.svg";
import mediumArrow from "../assets/images/arrow-medium.svg";
import chevron from "../assets/images/chevron.svg";

import "./styles/Timetable.scss";

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

  const fetchFlights = async () => {
    const dep = type === "outbound" ? origin.iata : destination.iata;
    const arr = type === "outbound" ? destination.iata : origin.iata;
    const res = await fetch(
      `https://mock-air.herokuapp.com/search?departureStation=${dep}&arrivalStation=${arr}&date=${
        day.isoDate
      }`
    );

    const data = await res.json();
    setFlights(data);
  };

  useEffect(() => {
    fetchFlights();
  }, [day]); // only fetch again if day changes

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
              <span>{`${prevDay.shortMonth} ${prevDay.day} ${
                prevDay.fullMonth
              }`}</span>
            </button>
          )}
        </div>
        <h3>{`${day.fullWeekday}, ${day.day} ${day.fullMonth} ${day.year}`}</h3>
        <div className="timetable__step timetable__step--next">
          {isNextAvailable && (
            <button type="button" onClick={() => handleDayChange(nextDay)}>
              <img src={chevron} alt="Next day" />
              <span>{`${nextDay.shortMonth} ${nextDay.day} ${
                nextDay.fullMonth
              }`}</span>
            </button>
          )}
        </div>
      </div>
      <div className="timetable__times">
        <>
          {flights && flights.length === 0 && (
            <p className="timetable__no-flights">
              A kiválasztott napon nincs elérhető járat.
            </p>
          )}
          {flights && flights.length > 0 && (
            <table className="table">
              <thead>
                <tr className="table__row table__row--header">
                  <th />
                  <th>Basic</th>
                  <th>Standard</th>
                  <th>Plus</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(flight => {
                  if (flight.remainingTicket === 0) return null;
                  const depTime = convertDate(flight.departure);
                  const isDisabled =
                    isToday && Date.now() > depTime.date.getTime();
                  const arrTime = convertDate(flight.arrival);
                  return (
                    <tr
                      key={flight.flightNumber}
                      className={
                        isDisabled
                          ? "table__row table__row--disabled"
                          : "table__row"
                      }
                    >
                      <td className="table__time">
                        {depTime.time}
                        <img src={smallArrow} alt="to" />
                        {arrTime.time}
                      </td>
                      <td>
                        <button
                          className={
                            selectedFare === flight.fares[0].fareSellKey
                              ? "table__btn table__btn--active"
                              : "table__btn"
                          }
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
                        </button>
                      </td>
                      <td>
                        <button
                          className={
                            selectedFare === flight.fares[1].fareSellKey
                              ? "table__btn table__btn--active"
                              : "table__btn"
                          }
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
                        </button>
                      </td>
                      <td>
                        <button
                          className={
                            selectedFare === flight.fares[2].fareSellKey
                              ? "table__btn table__btn--active"
                              : "table__btn"
                          }
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
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      </div>
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
