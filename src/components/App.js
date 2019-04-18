import React, { Component } from "react";
import Home from "./Home";
import Selection from "./Selection";
import AutoSuggest from "./SelectStation";
import StationsProvider from "./StationsProvider";

import "./styles/index.scss";
import "./styles/App.scss";

class App extends Component {
  render() {
    // return (
    //   <StationsProvider>
    //     <Selection />
    //   </StationsProvider>
    // );
    return (
      <StationsProvider>
        <Home />
      </StationsProvider>
    );
  }
}

export default App;
