import React, { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import Spinner from "./elements/Spinner";

const StationsContext = createContext();

const originSession = "mito-origin";
const destSession = "mito-destination";

const initialStations = {
  stations: null,
  origin: JSON.parse(sessionStorage.getItem(originSession)) || null,
  destination: JSON.parse(sessionStorage.getItem(destSession)) || null,
  departureDate: null,
  returnDate: null,
  secondaryReturnDate: null
};

const stationsReducer = (state, action) => {
  switch (action.type) {
    case "setStations":
      return {
        ...state,
        stations: action.stations
      };
    case "setOrigin":
      return {
        ...state,
        origin: action.origin
      };
    case "setDestination":
      return {
        ...state,
        destination: action.destination
      };
    case "setDeparture":
      return {
        ...state,
        departureDate: action.departureDate
      };
    case "setReturn":
      return {
        ...state,
        returnDate: action.returnDate
      };
    case "setSecondaryReturn":
      return {
        ...state,
        secondaryReturnDate: action.secondaryReturnDate
      };
    case "clearDates":
      return {
        ...state,
        departureDate: null,
        returnDate: null,
        secondaryReturnDate: null
      };
    case "switchStations":
      return {
        ...state,
        origin: state.destination,
        destination: state.origin
      };
    default:
      return state;
  }
};

const StationsProvider = props => {
  const [stations, stationsDispatch] = useReducer(
    stationsReducer,
    initialStations
  );

  const fetchStations = async () => {
    const res = await fetch("https://mock-air.herokuapp.com/asset/stations");
    const data = await res.json();
    // setStations(data);
    stationsDispatch({
      type: "setStations",
      stations: data
    });
  };

  useEffect(() => {
    fetchStations();
  }, []); // empty array to run only on mount

  return (
    <StationsContext.Provider
      value={{
        stations,
        stationsDispatch
      }}
    >
      {stations.stations ? props.children : <Spinner />}
    </StationsContext.Provider>
  );
};

StationsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default StationsProvider;
export { StationsContext, originSession, destSession };
