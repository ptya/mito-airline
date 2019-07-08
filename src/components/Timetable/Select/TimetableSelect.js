import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// context
import { CartContext } from "components/providers/CartProvider";
import { StationsContext } from "components/providers/StationsProvider";

// utils
import { convertDate } from "utils/convertDate";
import { formatMoney } from "utils/formatMoney";

// local elements
import Loading from "./_elements/Loading";

// global styles
import RelativeWrapper from "components/_styles/RelativeWrapper";

// local styles
import NavigationWrapper from "./_styles/NavigationWrapper";
import Previous from "./_styles/Previous";
import Day from "./_styles/Day";
import Next from "./_styles/Next";
import GeneralWrapper from "./_styles/GeneralWrapper";
import TableHeader from "./_styles/TableHeader";
import TableRow from "./_styles/TableRow";
import TableButton from "./_styles/TableButton";

// assets
import smallArrow from "assets/images/arrow-small.svg";
import chevron from "assets/images/chevron.svg";

const Timetable = props => {
  const { cartDispatch, cart } = useContext(CartContext);
  const {
    stationsDispatch,
    stations: { origin, destination, departureDate, returnDate }
  } = useContext(StationsContext);

  const { type } = props;
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
  const [flights, setFlights] = useState(null);

  useEffect(() => {
    setFlights(null);
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
    type === "outbound"
      ? stationsDispatch({ type: "setDeparture", departureDate: date })
      : stationsDispatch({ type: "setReturn", returnDate: date });
  };

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

  return (
    <>
      <NavigationWrapper>
        <Previous>
          {isPrevAvailable && (
            <button type="button" onClick={() => handleDayChange(prevDay)}>
              <img src={chevron} alt="Previous day" />
              <span>{`${prevDay.shortMonth} ${prevDay.day} ${prevDay.fullMonth}`}</span>
            </button>
          )}
        </Previous>
        <Day>{`${day.fullWeekday}, ${day.day} ${day.fullMonth} ${day.year}`}</Day>
        <Next>
          {isNextAvailable && (
            <button type="button" onClick={() => handleDayChange(nextDay)}>
              <img src={chevron} alt="Next day" />
              <span>{`${nextDay.shortMonth} ${nextDay.day} ${nextDay.fullMonth}`}</span>
            </button>
          )}
        </Next>
      </NavigationWrapper>
      {!flights && <Loading />}
      {flights && flights.length === 0 && (
        <GeneralWrapper>
          There are no available flights this day.
        </GeneralWrapper>
      )}
      {flights && flights.length > 0 && (
        <RelativeWrapper>
          <TableHeader>
            <span className="basic">Basic</span>
            <span className="standard">Standard</span>
            <span className="plus">Plus</span>
          </TableHeader>
          {flights.map(flight => {
            if (flight.remainingTicket === 0) return null;
            const depTime = convertDate(flight.departure);
            const isDisabled = isToday && Date.now() > depTime.date.getTime();
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
        </RelativeWrapper>
      )}
    </>
  );
};

Timetable.propTypes = {
  type: PropTypes.string.isRequired
};

export default Timetable;
