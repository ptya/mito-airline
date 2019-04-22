import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const StationsContext = createContext();

const originSession = "mito-origin";
const destSession = "mito-destination";

const StationsProvider = props => {
  const [stations, setStations] = useState();
  const [origin, setOrigin] = useState(
    JSON.parse(sessionStorage.getItem(originSession)) || null
  );
  const [destination, setDestination] = useState(
    JSON.parse(sessionStorage.getItem(destSession)) || null
  );
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [secondaryReturnDate, setSecondaryReturnDate] = useState();

  const fetchStations = async () => {
    const res = await fetch("https://mock-air.herokuapp.com/asset/stations");
    const data = await res.json();
    setStations(data);
  };

  useEffect(() => {
    fetchStations();
  }, []); // empty array to run only on mount

  return (
    <StationsContext.Provider
      value={{
        stations,
        origin,
        destination,
        departureDate,
        returnDate,
        secondaryReturnDate,
        setOrigin,
        setDestination,
        setDepartureDate,
        setReturnDate,
        setSecondaryReturnDate
      }}
    >
      {stations ? props.children : null}
    </StationsContext.Provider>
  );
};

StationsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StationsProvider;
export { StationsContext, originSession, destSession };
