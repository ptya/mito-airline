import React, { Component, useContext, useState } from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import { StationsContext } from "./StationsProvider";

import "./styles/SelectStation.scss";

const SelectStation = props => {
  const { placeholder, id, stored } = props;
  const [value, setValue] = useState(stored ? stored.shortName : "");
  const [isSet, setIsSet] = useState(stored ? true : false);
  const [suggestions, setSuggestions] = useState([]);

  const {
    stations,
    origin,
    destination,
    setOrigin,
    setDestination
  } = useContext(StationsContext);

  const getSelection = () => {
    if (!origin && !destination) return stations;
    if (origin) {
      const connections = origin.connections.map(
        connection => connection["iata"]
      );
      return stations.filter(station => connections.includes(station.iata));
    }
    if (destination) {
      const connections = destination.connections.map(
        connection => connection["iata"]
      );
      return stations.filter(station => connections.includes(station.iata));
    }
  };

  const selection = getSelection();

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    if (isSet) {
      setIsSet(false);
      id === "origin" ? setOrigin(null) : setDestination(null);
    }
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = val => {
    const inputValue = val.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? selection
      : selection.filter(
          station =>
            station.shortName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => {
    return suggestion.shortName;
  };

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => {
    return <div>{suggestion.shortName}</div>;
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    const newSuggestions = getSuggestions(value);
    setSuggestions(newSuggestions);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    event.preventDefault();
    setIsSet(true);
    id === "origin" ? setOrigin(suggestion) : setDestination(suggestion);
  };

  const shouldRenderSuggestions = val => {
    return origin || destination || val.trim().length > 0 ? true : false;
  };

  const inputProps = {
    placeholder,
    value,
    onChange
  };

  return (
    <Autosuggest
      id={id}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
      highlightFirstSuggestion={true}
      shouldRenderSuggestions={shouldRenderSuggestions}
    />
  );
};

SelectStation.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired
};

SelectStation.defaultProps = {
  placeholder: ""
};

export default SelectStation;
