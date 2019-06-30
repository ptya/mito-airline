import React, { useContext } from "react";
import PropTypes from "prop-types";

// components
import TimetableHeader from "./Header/TimetableHeader";
import TimetableSelect from "./Select/TimetableSelect";
import TimetableForm from "./Form/TimetableForm";

// context
import { StationsContext } from "../StationsProvider";

// local elements
import ArticleWrapper from "./elements/ArticleWrapper";
import AnimatedWrapper from "./elements/AnimatedWrapper";

const Timetable = props => {
  const {
    stations: { returnDate }
  } = useContext(StationsContext);

  const { type } = props;

  // only set to false, if inbound and there's no returnDate
  const isChosen = (returnDate && type === "inbound") || type === "outbound";
  return (
    <ArticleWrapper area={type}>
      <TimetableHeader type={type} />
      <AnimatedWrapper isChosen={isChosen}>
        {isChosen && <TimetableSelect type={type} />}
        {!isChosen && <TimetableForm />}
      </AnimatedWrapper>
    </ArticleWrapper>
  );
};

Timetable.propTypes = {
  type: PropTypes.string.isRequired
};

export default Timetable;
