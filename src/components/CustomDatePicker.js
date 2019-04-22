import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import { useFloat } from "./hooks/useFloat";
import { StationsContext } from "./StationsProvider";
import { convertDate } from "../utils/convertDate";

import "react-datepicker/dist/react-datepicker.css";
import "./styles/floatingLabel.scss";

const CustomDatePicker = props => {
  const {
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate,
    setSecondaryReturnDate
  } = useContext(StationsContext);

  const [startDate, setStartDate] = useState();
  const [isActive, setIsActive] = useState(false);
  const { placeholder, type } = props;

  useFloat(type, () => setIsActive(true));

  const handleChange = date => {
    setStartDate(date);
    switch (type) {
      case "departure":
        return setDepartureDate(convertDate(date));
      case "return":
        return setReturnDate(convertDate(date));
      case "secondaryReturn":
        return setSecondaryReturnDate(convertDate(date));
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
      case "return":
      case "secondaryReturn": {
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

  const onBlur = () => {
    if (!startDate) {
      setIsActive(false);
      switch (type) {
        case "departure": {
          setDepartureDate();
          break;
        }
        case "return": {
          setReturnDate();
          break;
        }
        case "secondaryReturn": {
          setReturnDate();
          break;
        }
        default:
          return;
      }
    }
  };

  return (
    <div className="float__container">
      <label
        htmlFor={type}
        className={
          isActive ? "float__label float__label--active" : "float__label"
        }
      >
        {placeholder}
      </label>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        minDate={limits.minDate}
        maxDate={limits.maxDate}
        onBlur={onBlur}
        className="float__input"
        dateFormat={`EEE d. MMM. yyyy`}
        id={type}
        autocomplete="off"
      />
    </div>
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
