import React from "react";
import PropTypes from "prop-types";

import smallArrow from "../assets/images/arrow-small.svg";
import mediumArrow from "../assets/images/arrow-medium.svg";
import chevron from "../assets/images/chevron.svg";

import "./styles/Timetable.scss";

const Timetable = props => {
  const { className } = props;
  const blockClass = `${className} timetable`.trim();
  return (
    <div className={blockClass}>
      <div className="timetable__header">
        <h2>
          Outbound
          <span className="timetable__route">
            Budapest
            <img src={mediumArrow} alt="to" />
            Barcelona El Prat
          </span>
        </h2>
      </div>
      <div className="timetable__date">
        <button type="button" className="timetable__step">
          <img src={chevron} alt="Previous day" />
          <span>Wed 7 October</span>
        </button>
        <h3>Saturday, 3 November 2015</h3>
        <button className="timetable__step timetable__step--next">
          <img src={chevron} alt="Next day" />
          <span>Sat 10 October</span>
        </button>
      </div>
      <div className="timetable__times">
        <table className="table">
          <thead>
            <tr className="table__row table__row--header">
              <th />
              <th>Basic</th>
              <th>Standard</th>
              <th>Plus</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table__row">
              <td className="table__time">
                06:02 <img src={smallArrow} alt="to" /> 07:35
              </td>
              <td>
                <button className="table__btn" type="button">
                  $9.99
                </button>
              </td>
              <td>
                <button className="table__btn" type="button">
                  $19.99
                </button>
              </td>
              <td>
                <button className="table__btn" type="button">
                  $29.99
                </button>
              </td>
            </tr>
            <tr className="table__row">
              <td className="table__time">
                06:02 <img src={smallArrow} alt="to" /> 07:35
              </td>
              <td>
                <button className="table__btn" type="button">
                  $9.99
                </button>
              </td>
              <td>
                <button className="table__btn" type="button">
                  $19.99
                </button>
              </td>
              <td>
                <button className="table__btn" type="button">
                  $29.99
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
