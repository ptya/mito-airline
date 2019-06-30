import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

// hooks
import { useFloat } from "./hooks/useFloat";

// context
import { StationsContext } from "./StationsProvider";

// utils
import { convertDate } from "../utils/convertDate";

// global elements
import FloatingLabel from "./elements/FloatingLabel";

const CustomDatePicker = props => {
  const {
    stationsDispatch,
    stations: { departureDate, returnDate }
  } = useContext(StationsContext);

  const [startDate, setStartDate] = useState();
  const [isActive, setIsActive] = useState(false);
  const { placeholder, type } = props;

  useFloat(type, () => setIsActive(true));

  const handleChange = date => {
    setStartDate(date);
    const convertedDate = convertDate(date);
    switch (type) {
      case "departure":
        return stationsDispatch({
          type: "setDeparture",
          departureDate: convertedDate
        });
      case "return":
        return stationsDispatch({
          type: "setReturn",
          returnDate: convertedDate
        });
      case "secondaryReturn":
        return stationsDispatch({
          type: "setSecondaryReturn",
          secondaryReturnDate: convertedDate
        });
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
          stationsDispatch({
            type: "setDeparture",
            departureDate: null
          });
          break;
        }
        case "return": {
          stationsDispatch({
            type: "setReturn",
            returnDate: null
          });
          break;
        }
        case "secondaryReturn": {
          stationsDispatch({
            type: "setReturn",
            returnDate: null
          });
          break;
        }
        default:
          return;
      }
    }
  };

  return (
    <FloatingLabel labelId={type} placeholder={placeholder} isActive={isActive}>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        minDate={limits.minDate}
        maxDate={limits.maxDate}
        onBlur={onBlur}
        className="datepicker"
        popperClassName="datepicker__popper"
        dateFormat={`EEE d. MMM. yyyy`}
        id={type}
        autocomplete="off"
      />
    </FloatingLabel>
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
