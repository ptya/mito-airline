import React, { useContext } from "react";
import PropTypes from "prop-types";

// components
import TimetableHeader from "./Header/TimetableHeader";
import TimetableSelect from "./Select/TimetableSelect";

// global elements
import ArticleWrapper from "../elements/ArticleWrapper";

const Timetable = props => {
  const { type } = props;

  return (
    <ArticleWrapper>
      <TimetableHeader type={type} />
      <TimetableSelect type={type} />
    </ArticleWrapper>
  );
};

Timetable.propTypes = {
  type: PropTypes.string.isRequired
};

export default Timetable;
