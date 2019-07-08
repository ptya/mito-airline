import React, { useReducer } from "react";
import PropTypes from "prop-types";

import {
  StationsContext,
  stationsReducer,
  initialStations
} from "../StationsProvider";

const TestStationsProvider = props => {
  const { state, reducer } = props;
  const [stations, stationsDispatch] = useReducer(reducer, state);

  return (
    <StationsContext.Provider
      value={{
        stations,
        stationsDispatch
      }}
    >
      {props.children}
    </StationsContext.Provider>
  );
};

TestStationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object,
  reducer: PropTypes.func
};

TestStationsProvider.defaultProps = {
  state: initialStations,
  reducer: stationsReducer
};

export default TestStationsProvider;
