import React, {
  useContext,
  useState,
  useLayoutEffect,
  useCallback
} from "react";
import { animated, useSpring } from "react-spring";
import { withRouter } from "react-router-dom";

import SelectStation from "./SelectStation";
import CustomDatePicker from "./CustomDatePicker";

import {
  StationsContext,
  originSession,
  destSession
} from "./StationsProvider";

import warning from "../assets/images/error.svg";
import logo from "../assets/images/mito-logo.svg";

const Home = props => {
  const { history } = props;
  const { origin, destination, departureDate } = useContext(StationsContext);
  const [error, setError] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback(() => {
    const e = {};
    if (!origin) e.origin = "Please select origin";
    if (!destination) e.destination = "Please select destination";
    if (!departureDate) e.departure = "Please select departure";
    setError(e);
    return e.origin || e.destination || e.departure ? true : false;
  }, [origin, destination, departureDate]);

  useLayoutEffect(() => {
    // skip validation until first submit
    if (!isSubmitted) {
      return;
    }
    validate();
  }, [origin, destination, departureDate, isSubmitted, validate]);

  const onSubmit = async event => {
    event.preventDefault();
    const err = validate();
    if (!isSubmitted) setIsSubmitted(true);
    if (err) {
      return;
    }

    sessionStorage.setItem(originSession, JSON.stringify(origin));
    sessionStorage.setItem(destSession, JSON.stringify(destination));
    history.push("/selection");
  };

  const fade = useSpring({
    from: {
      opacity: 0
    },
    opacity: 1
  });

  return (
    <animated.div className="background" style={fade}>
      <main className="search">
        <header className="search__header">
          <img className="search__logo" src={logo} alt="Mito Airline" />
          <h1 className="search__title">Mito Airline</h1>
        </header>
        <form className="search__form" autoComplete="off" onSubmit={onSubmit}>
          <fieldset>
            <div
              className={
                error && error.origin
                  ? "search__input search__input--error"
                  : "search__input"
              }
            >
              <SelectStation id="origin" placeholder="Origin" stored={origin} />
              {error && error.origin && (
                <div className="search__error">
                  <img src={warning} alt="error" />
                  <span>{error.origin}</span>
                </div>
              )}
            </div>
            <div
              className={
                error && error.destination
                  ? "search__input search__input--error"
                  : "search__input"
              }
            >
              <SelectStation
                id="dest"
                placeholder="Destination"
                stored={destination}
              />
              {error && error.destination && (
                <div className="search__error">
                  <img src={warning} alt="error" />
                  <span>{error.destination}</span>
                </div>
              )}
            </div>
            <div
              className={
                error && error.departure
                  ? "search__input search__input--error"
                  : "search__input"
              }
            >
              <CustomDatePicker placeholder="Departure" type="departure" />
              <i className="search__ico" />
              {error && error.departure && (
                <div className="search__error">
                  <img src={warning} alt="error" />
                  <span>{error.departure}</span>
                </div>
              )}
            </div>
            <div className="search__input">
              <CustomDatePicker placeholder="Return" type="return" />
              <i className="search__ico" />
            </div>
            <button className="search__btn" type="submit">
              Search
            </button>
          </fieldset>
        </form>
      </main>
    </animated.div>
  );
};

export default withRouter(Home);
