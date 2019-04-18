import React, { useContext } from "react";
import SelectStation from "./SelectStation";
import CustomDatePicker from "./CustomDatePicker";
import { StationsContext } from "./StationsProvider";

import logo from "../assets/images/mito-logo.svg";
import "./styles/Home.scss";

const Home = () => {
  const { origin, destination, departureDate, returnDate } = useContext(
    StationsContext
  );

  const onSubmit = event => {
    event.preventDefault();
    console.log(origin, destination, departureDate, returnDate);
  };

  return (
    <div className="background">
      <main className="search">
        <header className="search__header">
          <img className="search__logo" src={logo} alt="Mito Airline" />
          <h1 className="search__title">Mito Airline</h1>
        </header>
        <form className="search__form" onSubmit={onSubmit}>
          <fieldset>
            <div className="search__input">
              <SelectStation id="origin" placeholder="Origin" />
            </div>
            <div className="search__input">
              <SelectStation id="dest" placeholder="Destination" />
            </div>
            <div className="search__input">
              <CustomDatePicker placeholder="Departure" type="departure" />
              <i className="search__ico" />
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

export default Home;
