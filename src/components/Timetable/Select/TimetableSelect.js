import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// context
import { CartContext } from "components/CartProvider";
import { StationsContext } from "components/StationsProvider";

// utils
import { convertDate } from "utils/convertDate";
import { formatMoney } from "utils/formatMoney";

// local elements
import NavigationWrapper from "../elements/NavigationWrapper";
import Previous from "../elements/Previous";
import Day from "../elements/Day";
import Next from "../elements/Next";
import Loading from "../elements/Loading";
import GeneralWrapper from "../elements/GeneralWrapper";
import TableWrapper from "../elements/TableWrapper";
import TableHeader from "../elements/TableHeader";
import TableRow from "../elements/TableRow";
import TableButton from "../elements/TableButton";

// assets
import smallArrow from "assets/images/arrow-small.svg";
import chevron from "assets/images/chevron.svg";

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
      <TableWrapper>
        <>
          {!flights && <Loading />}
          {flights && flights.length === 0 && (
            <GeneralWrapper>
              There are no available flights this day.
            </GeneralWrapper>
          )}
          {flights && flights.length > 0 && (
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
          )}
        </>
      </TableWrapper>
    </>
  );
};

Timetable.propTypes = {
  type: PropTypes.string.isRequired
};

export default Timetable;
