import React from "react";

import logo from "../assets/images/mito-logo.svg";
import "./styles/Home.scss";

const Home = () => {
  return (
    <div className="background">
      <main className="search">
        <header className="search__header">
          <img className="search__logo" src={logo} alt="Mito Airline" />
          <h1 className="search__title">Mito Airline</h1>
        </header>
        <form className="search__form">
          <fieldset>
            <div className="search__input">
              <input type="text" placeholder="Origin" />
            </div>
            <div className="search__input">
              <input type="text" placeholder="Destination" />
            </div>
            <div className="search__input">
              <input type="date" name="dep" placeholder="Departure" />
              <i class="search__ico" />
            </div>
            <div className="search__input">
              <input type="date" name="ret" placeholder="Return" />
              <i class="search__ico" />
            </div>
            <input className="search__btn" type="submit" value="search" />
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default Home;
