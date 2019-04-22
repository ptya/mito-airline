import React, { useContext, useState, useLayoutEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import SelectStation from "./SelectStation";
import CustomDatePicker from "./CustomDatePicker";
import {
  StationsContext,
  originSession,
  destSession
} from "./StationsProvider";

import logo from "../assets/images/mito-logo.svg";
import warning from "../assets/images/error.svg";
import "./styles/Home.scss";

const Home = props => {
  const { history } = props;
  const { origin, destination, departureDate } = useContext(StationsContext);
  const [error, setError] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!origin) e.origin = "Please select origin";
    if (!destination) e.destination = "Please select destination";
    if (!departureDate) e.departure = "Please select departure";
    setError(e);
    return e.origin || e.destination || e.departure ? true : false;
  };

  useLayoutEffect(() => {
    // skip validation until first submit
    if (!isSubmitted) {
      return;
    }
    validate();
  }, [origin, destination, departureDate]);

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

  return (
    <div className="background">
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
            <input className="search__btn" type="submit" value="search" />
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default withRouter(Home);
