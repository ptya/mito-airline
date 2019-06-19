import React, { useContext } from "react";
import PropTypes from "prop-types";

import CustomDatePicker from "./CustomDatePicker";

import { StationsContext } from "./StationsProvider";
import CalendarIco from "./elements/CalendarIco";
import InputField from "./elements/InputField";

import mediumArrow from "../assets/images/arrow-medium.svg";

const Timetable = props => {
  const {
    origin,
    destination,
    secondaryReturnDate,
    setReturnDate
  } = useContext(StationsContext);

  const onSubmit = event => {
    event.preventDefault();
    if (secondaryReturnDate) {
      setReturnDate(secondaryReturnDate);
    }
  };

  const { className } = props;
  const blockClass = `${className} timetable`.trim();

  return (
    <div className={blockClass}>
      <div className="timetable__header">
        <h2>
          Inbound
          <span className="timetable__route">
            {destination.shortName}
            <img src={mediumArrow} alt="to" />
            {origin.shortName}
          </span>
        </h2>
      </div>
      <form
        className="search__form--selection"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <fieldset>
          <InputField>
            <CustomDatePicker placeholder="Return" type="secondaryReturn" />
            <CalendarIco />
          </InputField>
          <button type="submit" className="search__btn search__btn--selection">
            Search
          </button>
        </fieldset>
      </form>
    </div>
  );
};

Timetable.propTypes = {
  className: PropTypes.string
};

Timetable.defaultProps = {
  className: ""
};

export default Timetable;
