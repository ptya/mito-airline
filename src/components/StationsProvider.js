import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const StationsContext = createContext();

const StationsProvider = props => {
  const [stations, setStations] = useState({});
  console.log(stations);

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
        stations
      }}
    >
      {props.children}
    </StationsContext.Provider>
  );
};

StationsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StationsProvider;
export { StationsContext };
