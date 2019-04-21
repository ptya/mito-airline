import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import { StationsContext } from "./StationsProvider";
import { convertDate } from "../utils/convertDate";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = props => {
  const {
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate
  } = useContext(StationsContext);

  const [startDate, setStartDate] = useState();
  const { placeholder, type } = props;

  const handleChange = date => {
    setStartDate(date);
    switch (type) {
      case "departure":
        return setDepartureDate(convertDate(date));
      case "return":
        return setReturnDate(convertDate(date));
      default:
        return;
    }
  };

  const getLimits = () => {
    const today = new Date();
    switch (type) {
      case "departure": {
        let maxDate;
        if (returnDate) {
          maxDate = new Date(returnDate.date);
          maxDate.setDate(maxDate.getDate() - 1);
        } else {
          maxDate = null;
        }
        return {
          minDate: today,
          maxDate
        };
      }
      case "return": {
        let minDate;
        if (departureDate) {
          minDate = new Date(departureDate.date);
          minDate.setDate(minDate.getDate() + 1);
        } else {
          minDate = new Date();
          minDate.setDate(minDate.getDate() + 1);
        }
        return {
          minDate,
          maxDate: null
        };
      }
      default:
        return null;
    }
  };
  const limits = getLimits();

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      placeholderText={placeholder}
      minDate={limits.minDate}
      maxDate={limits.maxDate}
    />
  );
};

CustomDatePicker.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired
};

CustomDatePicker.defaultProps = {
  placeholder: ""
};

export default CustomDatePicker;
